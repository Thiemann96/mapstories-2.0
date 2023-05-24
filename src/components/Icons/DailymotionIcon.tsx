import * as React from 'react'
import { IconProps } from '@/src/types/Icon'

const SvgDailymotionIcon = React.forwardRef<SVGSVGElement, IconProps>(
  (props, ref) => {
    return (
      <svg
        fill="#FF7700"
        id="Layer_1"
        version="1.1"
        viewBox="0 0 48 48"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <g
          fill="none"
          fill-rule="evenodd"
          id="Icons"
          stroke="none"
          stroke-width="1"
        >
          <g
            fill="#0066DC"
            id="Color-"
            transform="translate(-400.000000, -361.000000)"
          >
            <path
              d="M400,409 L448,409 L448,361 L400,361 L400,409 Z M441.390625,402.565422 L434.236141,402.565422 L434.236141,399.759719 C432.038406,401.910766 429.793797,402.705719 426.801063,402.705719 C423.761547,402.705719 421.142875,401.723734 418.945047,399.759719 C416.045781,397.187875 414.549484,393.821031 414.549484,389.893047 C414.549484,386.292344 415.952406,383.065844 418.570984,380.540687 C420.909109,378.249391 423.761547,377.080375 426.941359,377.080375 C429.980875,377.080375 432.318953,378.109094 434.002375,380.260094 L434.002375,369.317875 L441.390625,367.787031 L441.390625,402.565422 Z M428.157203,383.626984 C424.650016,383.626984 421.937875,386.479422 421.937875,389.846266 C421.937875,393.353453 424.650016,396.018813 428.43775,396.018813 C431.617563,396.018813 434.282922,393.400188 434.282922,389.939781 C434.282922,386.339172 431.617563,383.626984 428.157203,383.626984 Z"
              id="Dailymotion"
            ></path>
          </g>
        </g>
      </svg>
    )
  },
)

export default SvgDailymotionIcon
