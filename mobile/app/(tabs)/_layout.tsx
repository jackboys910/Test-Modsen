import React from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { Tabs } from 'expo-router'
import Colors from '@/constants/Colors'
import { useColorScheme } from '@/components/useColorScheme'

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name']
  color: string
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />
}

export default function TabLayout() {
  const colorScheme = useColorScheme()

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarStyle: { display: 'none' },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'index',
        }}
      />
      <Tabs.Screen
        name="Authorization"
        options={{
          title: 'Authorization',
        }}
      />
      <Tabs.Screen
        name="Messenger"
        options={{
          title: 'Messenger',
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          title: 'Profile',
        }}
      />
      <Tabs.Screen
        name="PublicProfile"
        options={{
          title: 'PublicProfile',
        }}
      />
      <Tabs.Screen
        name="RecipeDetails"
        options={{
          title: 'RecipeDetails',
        }}
      />
      <Tabs.Screen
        name="NotFound"
        options={{
          title: 'NotFound',
        }}
      />
      {/* <Tabs.Screen
        name="two"
        options={{
          title: 'Tab Two',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          headerShown: false,
        }}
      /> */}
    </Tabs>
  )
}
