import FontAwesome from '@expo/vector-icons/FontAwesome'
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import 'react-native-reanimated'
// import index from './(tabs)/index'
// import Authorization from './(tabs)/Authorization'
// import Messenger from './(tabs)/Messenger'
// import NotFound from './(tabs)/NotFound'
// import Profile from './(tabs)/Profile'
// import PublicProfile from './(tabs)/PublicProfile'
// import RecipeDetails from './(tabs)/RecipeDetails'

import { useColorScheme } from '@/components/useColorScheme'

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router'

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [loaded, error] = useFonts({
    InterRegular: require('../assets/fonts/Inter/Regular/Inter_18pt-Regular.ttf'),
    InterMedium: require('../assets/fonts/Inter/Medium/Inter_18pt-Medium.ttf'),
    InterBold: require('../assets/fonts/Inter/Bold/Inter_18pt-Bold.ttf'),
    InterLight: require('../assets/fonts/Inter/Light/Inter_18pt-Light.ttf'),
    RobotoRegular: require('../assets/fonts/Roboto/Regular/Roboto-Regular.ttf'),
    SpaceGroteskMedium: require('../assets/fonts/SpaceGrotesk/Medium/SpaceGrotesk-Medium.ttf'),
    PoppinsRegular: require('../assets/fonts/Poppins/Regular/Poppins-Regular.ttf'),
    PoppinsMedium: require('../assets/fonts/Poppins/Medium/Poppins-Medium.ttf'),
    PlayfairDisplayMedium: require('../assets/fonts/PlayfairDisplay/Medium/PlayfairDisplay-Medium.ttf'),
    PlayfairDisplayBold: require('../assets/fonts/PlayfairDisplay/Bold/PlayfairDisplay-Bold.ttf'),
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  })

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error
  }, [error])

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return <RootLayoutNav />
}

function RootLayoutNav() {
  const colorScheme = useColorScheme()

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  )
}
