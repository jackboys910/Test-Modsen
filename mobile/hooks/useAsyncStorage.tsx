import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const useAsyncStorage = (key: string) => {
  const [storedValue, setStoredValue] = useState<string | null>(null)

  const getStoredValue = async () => {
    const value = await AsyncStorage.getItem(key)
    setStoredValue(value)
  }

  useEffect(() => {
    getStoredValue()
  }, [key])

  return [storedValue, getStoredValue] as const
}

export default useAsyncStorage
