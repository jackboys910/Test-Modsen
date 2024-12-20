import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

const SearchIcon = (props: SvgProps) => (
  <Svg width={18} height={18} fill="none" {...props}>
    <Path
      fill="#3C3C43"
      fillOpacity={0.6}
      d="M7.532 14.033a6.873 6.873 0 0 0 3.797-1.142l3.85 3.858c.255.246.58.37.931.37.73 0 1.266-.572 1.266-1.293 0-.334-.114-.659-.36-.905l-3.824-3.84a6.86 6.86 0 0 0 1.257-3.965C14.45 3.311 11.338.2 7.532.2 3.735.2.615 3.311.615 7.116c0 3.806 3.112 6.917 6.917 6.917Zm0-1.845c-2.786 0-5.071-2.286-5.071-5.072s2.285-5.071 5.071-5.071c2.786 0 5.072 2.285 5.072 5.071 0 2.786-2.286 5.072-5.072 5.072Z"
    />
  </Svg>
)

export default SearchIcon
