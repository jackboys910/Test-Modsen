import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

const MenuIcon = (props: SvgProps) => (
  <Svg width={55} height={49} fill="none" {...props}>
    <Path
      fill="#fff"
      d="M66 26a1.5 1.5 0 0 0 0-3v3ZM0 26h66v-3H0v3ZM37.2 3.5a1.5 1.5 0 0 0 0-3v3ZM0 3.5h37.2v-3H0v3ZM66 48.5a1.5 1.5 0 1 0 0-3v3Zm-37.2 0H66v-3H28.8v3Z"
    />
  </Svg>
)

export default MenuIcon
