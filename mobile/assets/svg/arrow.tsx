import * as React from 'react'
import Svg, { SvgProps, G, Path, Defs } from 'react-native-svg'

const ArrowIcon = (props: SvgProps) => (
  <Svg width={18} height={14} fill="none" {...props}>
    <G filter="url(#a)">
      <Path fill="#484848" d="m9 .5-5 5h10l-5-5Z" />
      <Path fill="#000" fillOpacity={0.2} d="m9 .5-5 5h10l-5-5Z" />
      <Path stroke="#000" d="M12.793 5H5.207L9 1.207 12.793 5Z" />
    </G>
    <Defs></Defs>
  </Svg>
)
export default ArrowIcon
