import React, { useEffect, useState, useRef, useCallback } from 'react'
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ImageBackground,
  Keyboard,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import io from 'socket.io-client'
import { SERVER_IP } from '../../constants/config'
import { useRoute, useFocusEffect } from '@react-navigation/native'
import formatLastMessageTime from '../../utils/formatLastMessageTime'
import formatMessageTime from '../../utils/formatLastMessageTime'
import getDateSeparator from '../../utils/getDateSeparator'
import formatLastOnline from '../../utils/formatLastOnline'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import BurgerMenu from '../../components/BurgerMenu'
import SearchInputWithClear from '../../components/SearchInputWithClear'
import AntDesign from '@expo/vector-icons/AntDesign'
import Ionicons from '@expo/vector-icons/Ionicons'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

const socket = io(SERVER_IP)

interface IMessage {
  sender_id: number
  content: string
  sent_at: string
}

interface IChat {
  id: number
  nickname: string
  profile_picture: string
  last_message_time: string
  last_message_content: string
  last_online: string | null
}

const processChatData = (data: IChat[]): IChat[] => {
  const chatMap = new Map<number, IChat>()

  data.forEach((chat: IChat) => {
    const existingChat = chatMap.get(chat.id)
    if (
      !existingChat ||
      new Date(chat.last_message_time) >
        new Date(existingChat.last_message_time)
    ) {
      chatMap.set(chat.id, chat)
    }
  })

  return Array.from(chatMap.values())
}

const Messenger: React.FC = () => {
  const [messages, setMessages] = useState<IMessage[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [chats, setChats] = useState<IChat[]>([])
  const [activeChat, setActiveChat] = useState<IChat | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [showChatWindow, setShowChatWindow] = useState(false)
  const [keyboardVisible, setKeyboardVisible] = useState(false)

  const chatInputRef = useRef<TextInput>(null)
  const chatMessagesRef = useRef<ScrollView>(null)
  const [loggedInUserId, setLoggedInUserId] = useState<number | null>(null)
  const route = useRoute()
  const { receiverNickname, senderNickname } = route.params as {
    receiverNickname: string
    senderNickname: string | null
  }

  useEffect(() => {
    const fetchUserId = async () => {
      const userId = await AsyncStorage.getItem('userId')
      if (userId) {
        setLoggedInUserId(Number(userId))
      }
    }
    fetchUserId()
  }, [])

  // useEffect(() => {
  //   if (loggedInUserId !== null) {
  //     socket.emit('joinRoom', loggedInUserId);
  //   }
  // }, [loggedInUserId]);

  useEffect(() => {
    if (loggedInUserId !== null) {
      socket.emit('joinRoom', loggedInUserId)
    }

    socket.on('receiveMessage', (message: any) => {
      const formattedMessage: IMessage = {
        sender_id: message.senderId ?? message.sender_id,
        content: message.content,
        sent_at: message.sent_at,
      }

      if (formattedMessage.sender_id !== loggedInUserId) {
        setMessages((prevMessages) => [...prevMessages, formattedMessage])
      }

      fetchConversations()
    })

    return () => {
      socket.off('receiveMessage')
    }
  }, [loggedInUserId])

  useFocusEffect(
    useCallback(() => {
      fetchConversations()
    }, [receiverNickname])
  )

  useEffect(() => {
    if (receiverNickname && receiverNickname !== loggedInUserId?.toString()) {
      // setSearchQuery(receiverNickname)
      // handleSearch(receiverNickname)
      setShowChatWindow(true)
    }
  }, [receiverNickname])

  const fetchConversations = async () => {
    const token = await AsyncStorage.getItem('token')
    try {
      const response = await fetch(`${SERVER_IP}/conversations`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (response.ok) {
        const data = await response.json()
        const uniqueChats = processChatData(data)
        setChats(uniqueChats)
        if (receiverNickname) {
          const chat = data.find((c: IChat) => c.nickname === receiverNickname)
          setActiveChat(
            chat || {
              id: 0,
              nickname: receiverNickname,
              profile_picture: '',
              last_message_time: '',
              last_online: null,
              last_message_content: '',
            }
          )
        }
      } else {
        console.error('Failed to fetch conversations:', response.statusText)
      }
    } catch (error) {
      console.error('Error fetching conversations:', error)
    }
  }

  // useEffect(() => {
  //   fetchConversations()
  // }, [])

  const fetchMessages = async (chat: IChat) => {
    const token = await AsyncStorage.getItem('token')
    try {
      const response = await fetch(`${SERVER_IP}/messages/${chat.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (response.ok) {
        const data = await response.json()
        setMessages(data)
      }
    } catch (error) {
      console.error('Error fetching messages:', error)
    }
  }

  useEffect(() => {
    if (activeChat) {
      fetchMessages(activeChat)
    }
  }, [activeChat])

  const sendMessage = async (content: string) => {
    if (content.trim() && activeChat) {
      const token = await AsyncStorage.getItem('token')
      const receiverNickname =
        activeChat.nickname === 'Saved Messages'
          ? await AsyncStorage.getItem('nickname')
          : activeChat.nickname

      try {
        await fetch(`${SERVER_IP}/sendMessage`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ receiverNickname, content }),
        })

        socket.emit('sendMessage', {
          senderId: loggedInUserId,
          receiverNickname,
          content,
        })

        setMessages((prevMessages) => [
          ...prevMessages,
          {
            sender_id: loggedInUserId!,
            content,
            sent_at: new Date().toISOString(),
          },
        ])
        setNewMessage('')
        await fetchConversations()
      } catch (error) {
        console.error('Error sending message:', error)
      }
    }
  }

  const handleSearch = async (query: string) => {
    const token = await AsyncStorage.getItem('token')
    try {
      const response = await fetch(`${SERVER_IP}/search?query=${query}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (response.ok) {
        const data = await response.json()
        const formattedData = data.map((chat: IChat) => {
          if (chat.id === loggedInUserId) {
            return {
              ...chat,
              nickname: 'Saved Messages',
              profile_picture: 'scale_1200-round.png',
              last_message_time: chat.last_message_time || '',
              last_message_content: chat.last_message_content || '',
            }
          }
          return {
            ...chat,
            last_message_time: chat.last_message_time || '',
            last_message_content: chat.last_message_content || '',
          }
        })
        setChats(formattedData)
      }
    } catch (error) {
      console.error('Error searching:', error)
    }
  }

  const handleChatSelect = (chat: IChat) => {
    setActiveChat(chat)
    setShowChatWindow(true)
  }

  const handleBackArrowClick = () => {
    setShowChatWindow(false)
  }

  useEffect(() => {
    if (searchQuery) {
      handleSearch(searchQuery)
    } else {
      fetchConversations()
    }
  }, [searchQuery])

  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollToEnd({ animated: true })
    }
  }, [messages, activeChat])

  useEffect(() => {
    if (activeChat && chatInputRef.current) {
      chatInputRef.current.focus()
    }
  }, [activeChat])

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setKeyboardVisible(true)
    )
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setKeyboardVisible(false)
    )

    return () => {
      keyboardDidShowListener.remove()
      keyboardDidHideListener.remove()
    }
  }, [])

  return (
    <>
      <Header>
        <BurgerMenu />
      </Header>
      <View style={styles.bodyWrapper}>
        <View style={styles.messengerWrapper}>
          <View
            style={[
              styles.usersWindow,
              { display: showChatWindow ? 'none' : undefined },
            ]}
          >
            {/* <TextInput
              style={styles.searchInput}
              placeholder="Search"
              value={searchQuery}
              onChangeText={(text) => {
                setSearchQuery(text)
                handleSearch(text)
              }}
            /> */}
            <SearchInputWithClear
              value={searchQuery}
              onChange={(text) => {
                setSearchQuery(text)
                handleSearch(text)
              }}
            />
            <FlatList
              data={chats}
              style={styles.chatList}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleChatSelect(item)}>
                  <View style={styles.chatItem}>
                    <Image
                      source={{
                        uri: `${SERVER_IP}/assets/images/${item.profile_picture}`,
                      }}
                      style={styles.profileImage}
                    />
                    <Text style={styles.userNickname}>{item.nickname}</Text>
                    <Text style={{ position: 'absolute', top: 11, left: 190 }}>
                      {item.nickname === 'Saved Messages' &&
                        item.id === loggedInUserId && (
                          <MaterialIcons
                            name="verified-user"
                            size={20}
                            color="green"
                          />
                        )}
                    </Text>
                    <Text style={styles.lastMessageContent}>
                      {item.last_message_content}
                    </Text>
                    <Text style={styles.lastMessageTime}>
                      {formatLastMessageTime(item.last_message_time)}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
          <View style={styles.chatWindow}>
            {activeChat ? (
              <>
                <View style={styles.chatHeader}>
                  <Text style={styles.chatUserNickname}>
                    {activeChat.nickname}
                  </Text>
                  {activeChat.nickname !== 'Saved Messages' && (
                    <Text style={styles.lastOnline}>
                      {formatLastOnline(activeChat.last_online)}
                    </Text>
                  )}
                  <AntDesign
                    style={styles.arrowBack}
                    name="arrowleft"
                    size={24}
                    color="black"
                    onPress={handleBackArrowClick}
                  />
                  {/* <TouchableOpacity
                    onPress={handleBackArrowClick}
                  ></TouchableOpacity> */}
                </View>
                <ImageBackground
                  source={{
                    uri: `${SERVER_IP}/assets/images/background-chat-1.png`,
                  }}
                >
                  <ScrollView
                    ref={chatMessagesRef}
                    style={[
                      styles.chatMessages,
                      { height: keyboardVisible ? 230 : 400 },
                    ]}
                  >
                    {messages.map((msg, index) => {
                      const dateSeparator = getDateSeparator(
                        msg.sent_at,
                        messages[index - 1]?.sent_at
                      )
                      return (
                        <View key={index}>
                          {dateSeparator && (
                            <Text style={styles.messageSeparator}>
                              {dateSeparator}
                            </Text>
                          )}
                          <View
                            style={[
                              styles.messageWrapper,
                              msg.sender_id === loggedInUserId &&
                                styles.fromSelf,
                            ]}
                          >
                            <Text
                              style={{
                                paddingBottom:
                                  formatMessageTime(msg.sent_at).length > 5
                                    ? 5
                                    : undefined,
                              }}
                            >
                              {msg.content}
                            </Text>
                            <Text style={styles.messageTime}>
                              {formatMessageTime(msg.sent_at)}
                            </Text>
                          </View>
                        </View>
                      )
                    })}
                  </ScrollView>
                </ImageBackground>
                <View style={styles.chatInputContainer}>
                  <TextInput
                    ref={chatInputRef}
                    style={styles.chatInput}
                    placeholder="Write a message..."
                    value={newMessage}
                    onChangeText={setNewMessage}
                  />
                  <TouchableOpacity onPress={() => sendMessage(newMessage)}>
                    <Ionicons name="send" size={25} color="#38b9d6" />
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <Text style={styles.startMessage}>
                Select a chat to start messaging
              </Text>
            )}
          </View>
        </View>
      </View>
      <Footer />
    </>
  )
}

const styles = StyleSheet.create({
  bodyWrapper: {
    display: 'flex',
    flexDirection: 'column',
    height: 1500,
    margin: 0,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  messengerWrapper: {
    flexDirection: 'column',
    width: '90%',
    height: 510,
    marginTop: 100,
    borderWidth: 1,
    borderColor: 'black',
    display: 'flex',
    overflow: 'hidden',
  },
  usersWindow: {
    width: '100%',
  },
  // searchInput: {
  //   padding: 10,
  //   borderBottomWidth: 1,
  // },
  chatList: {
    width: '100%',
    height: 452,
    overflowY: 'auto',
    borderRightWidth: 1,
    borderRightColor: '#ccc',
  },
  chatItem: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    position: 'relative',
    fontSize: 15,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userNickname: {
    fontSize: 16,
    position: 'absolute',
    maxWidth: 130,
    top: '19%',
    left: '20%',
  },
  lastMessageContent: {
    fontSize: 14,
    color: '#aba9a9',
    position: 'absolute',
    maxWidth: 225,
    overflow: 'hidden',
    top: '75%',
    left: '20%',
  },
  lastMessageTime: {
    fontSize: 14,
    color: '#aba9a9',
    position: 'absolute',
    top: '19%',
    right: '2%',
  },
  chatWindow: {
    flex: 1,
    fontFamily: 'RobotoRegular',
    fontSize: 13,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  chatHeader: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignItems: 'center',
    height: 58,
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    position: 'sticky',
    top: 0,
    zIndex: 1,
  },
  chatUserNickname: {
    fontSize: 16,
    marginBottom: 3,
  },
  lastOnline: {
    color: '#9e9e9e',
    position: 'absolute',
    top: 32,
    left: 10,
  },
  arrowBack: {
    marginRight: 10,
    position: 'absolute',
    right: 0,
    top: 5,
  },
  chatMessages: {
    padding: 10,
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
  },
  messageSeparator: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginTop: 5,
    marginRight: 0,
    marginBottom: 15,
    marginLeft: 0,
    fontSize: 14,
  },
  messageWrapper: {
    maxWidth: '70%',
    overflow: 'hidden',
    marginHorizontal: 0,
    paddingTop: 10,
    paddingRight: 50,
    paddingBottom: 10,
    paddingLeft: 10,
    borderRadius: 15,
    marginVertical: 5,
    backgroundColor: '#e0e0e0',
    position: 'relative',
    alignSelf: 'flex-start',
  },
  fromSelf: {
    alignSelf: 'flex-end',
    backgroundColor: '#d4f5d4',
  },
  messageTime: {
    fontSize: 11,
    color: '#5c5c5c',
    position: 'absolute',
    bottom: 3,
    right: 10,
  },
  chatInputContainer: {
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    height: 55,
    position: 'relative',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  chatInput: {
    fontFamily: 'RobotoRegular',
    flex: 1,
    padding: 10,
    borderWidth: 0,
    borderRadius: 5,
    outline: 'none',
    marginRight: 10,
  },
  sendButton: {
    paddingTop: 10,
    paddingRight: 20,
    paddingBottom: 10,
    paddingLeft: 10,
    backgroundColor: 'white',
    borderWidth: 0,
    borderRadius: 5,
    position: 'absolute',
    right: 0,
    bottom: '3%',
  },
  startMessage: {
    textAlign: 'center',
    backgroundColor: 'rgba(87, 87, 87, 0.4)',
    width: 300,
    color: 'white',
    paddingTop: 5,
    paddingRight: 10,
    paddingBottom: 5,
    paddingLeft: 10,
    borderRadius: 20,
  },
})

export default Messenger
