import * as React from 'react'
import Svg, { SvgProps, Circle } from 'react-native-svg'

const EllipseSmallIcon = (props: SvgProps) => (
  <Svg width={12} height={12} fill="none" {...props}>
    <Circle cx={6} cy={6} r={5} stroke="#A2A8BA" strokeWidth={2} />
  </Svg>
)

export default EllipseSmallIcon
