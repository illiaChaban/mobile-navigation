import { JSX } from 'solid-js/jsx-runtime'
import Src from './kozo.jpeg'

export const Img = (
  props: Omit<JSX.ImgHTMLAttributes<HTMLImageElement>, 'src'>,
) => <img src={Src} {...props} />
