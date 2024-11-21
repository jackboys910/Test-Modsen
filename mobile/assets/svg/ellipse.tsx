import * as React from 'react'
import Svg, { SvgProps, Circle } from 'react-native-svg'

const EllipseIcon = (props: SvgProps) => (
  <Svg width={25} height={26} fill="none" {...props}>
    <Circle cx={12.5} cy={12.979} r={11.5} stroke="#A2A8BA" strokeWidth={2} />
  </Svg>
)

export default EllipseIcon
