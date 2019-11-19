import strongIcon from '../../assets/pngicon/format_strong/2.png'
import emphasisIcon from '../../assets/pngicon/format_emphasis/2.png'
import underlineIcon from '../../assets/pngicon/format_underline/2.png'
import codeIcon from '../../assets/pngicon/code/2.png'
import imageIcon from '../../assets/pngicon/format_image/2.png'
import linkIcon from '../../assets/pngicon/format_link/2.png'
import strikeIcon from '../../assets/pngicon/format_strike/2.png'
import mathIcon from '../../assets/pngicon/format_math/2.png'
import clearIcon from '../../assets/pngicon/format_clear/2.png'

const icons = [
  {
    type: 'strong',
    icon: strongIcon,
    title: 'bold'
  }, {
    type: 'em',
    icon: emphasisIcon,
    title: 'italic'
  }, {
    type: 'u',
    icon: underlineIcon,
    title: 'underline'
  }, {
    type: 'del',
    icon: strikeIcon,
    title: 'strike'
  }, {
    type: 'inline_code',
    icon: codeIcon,
    title: 'code'
  }, {
    type: 'inline_math',
    icon: mathIcon,
    title: 'math'
  }, {
    type: 'link',
    icon: linkIcon,
    title: 'link'
  }, {
    type: 'image',
    icon: imageIcon,
    title: 'image'
  }, {
    type: 'clear',
    icon: clearIcon,
    title: 'clear'
  }
]

export default icons
