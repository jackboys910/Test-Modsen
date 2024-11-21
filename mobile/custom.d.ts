declare module '*.ttf'

declare module '*.svg' {
  import React from 'react'
  import { SvgProps } from 'react-native-svg'
  const content: React.FC<SvgProps>
  export default content
}

declare module '@env' {
  export const API_RN_ID: string
  export const API_RN_KEY: string
  export const IP_ADRESS: string
}
