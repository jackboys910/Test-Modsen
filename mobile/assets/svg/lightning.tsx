import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

const LightningIcon = (props: SvgProps) => (
  <Svg width={17} height={24} fill="none" {...props}>
    <Path
      fill="#FDBD84"
      d="M9 9h8L7 24v-9H0L9 0v9Zm-2 2V7.22L3.532 13H9v4.394L13.263 11H7Z"
    />
  </Svg>
)

export default LightningIcon
