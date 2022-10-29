import * as React from "react"
import Svg, { G, Path, Defs } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: filter */

const Plus = (props) => (
  <Svg
    width={78}
    height={78}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G filter="url(#a)">
      <Path
        d="M34 2.887a10 10 0 0 1 10 0l23.775 13.726a10 10 0 0 1 5 8.66v27.454a10 10 0 0 1-5 8.66L44 75.113a10 10 0 0 1-10 0L10.225 61.387a10 10 0 0 1-5-8.66V25.274a10 10 0 0 1 5-8.66L34 2.886Z"
        fill="#fff"
        fillOpacity={0.45}
        style={{
          mixBlendMode: "overlay",
        }}
      />
    </G>
    <Path
      d="M26.432 39.424c0 1.23.996 2.226 2.226 2.226h8.13v8.13c0 1.216.982 2.227 2.212 2.227 1.23 0 2.227-1.01 2.227-2.227v-8.13h8.13a2.22 2.22 0 0 0 0-4.438h-8.13v-8.13A2.235 2.235 0 0 0 39 26.855a2.222 2.222 0 0 0-2.212 2.227v8.13h-8.13c-1.23 0-2.226.996-2.226 2.212Z"
      fill="#fff"
    />
    <Defs></Defs>
  </Svg>
)

export default Plus
