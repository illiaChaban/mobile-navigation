import { createEffect, onMount } from 'solid-js'
import { styled } from 'solid-styled-components'
import { useRouter } from '../contexts'
import { useAtom, useRef } from '../hooks'
import { TPost, TPostProps } from '../types'

export const Post = (p: TPostProps) => {
  const ref = useRef<HTMLDivElement>()
  const animating$ = useAtom(!!p.from)

  const style$ = useAtom('')

  onMount(() => {
    console.log({ from: p.from })

    const fromEl = p.from
    if (fromEl) {
      const width = fromEl.clientWidth
      const windowWidth = window.innerWidth
      const scale = width / windowWidth

      const left = fromEl.offsetLeft
      const widthDiff = fromEl.clientWidth * scale - width
      const leftChange = -(left - widthDiff / 2) / scale

      const top = fromEl.offsetTop
      const heightDiff = fromEl.clientHeight * scale - fromEl.clientHeight
      const topChange = -(top - heightDiff / 2) / scale

      // const { clientWidth, clientHeight, offsetTop, offsetLeft } = fromEl

      // console.log({ clientWidth, clientHeight, offsetTop, offsetLeft })

      // style$(`
      //   position: absolute;
      //   width: ${fromEl.clientWidth}px;
      //   height: ${fromEl.clientHeight}px;
      //   top: ${fromEl.offsetTop}px;
      //   left: ${fromEl.offsetLeft}px;
      //   background: red;
      // `)

      // console.log({ left, widthDiff, leftAfterScale: leftChange })
      ref.current
        .animate(
          [
            {
              // position: 'absolute',
              width: `${fromEl.clientWidth}px`,
              height: `${fromEl.clientHeight}px`,
              top: `${fromEl.offsetTop}px`,
              left: `${fromEl.offsetLeft}px`,
              // transform: `scale(${scale}) translate(${leftChange}px, ${topChange}px)`,
            },
            {
              // position: 'absolute',
              width: `${windowWidth}px`,
              height: `${window.innerHeight}px`,
              top: 0,
              left: 0,
              // transform: 'scale(1) translate(0px, 0px)',
            },
          ],
          { duration: 300, fill: 'forwards' },
        )
        .finished.then(() => animating$(false))
    }
  })

  const style1$ = () => (animating$() ? 'position: absolute;' : '')
  createEffect(() => {
    console.log({ style: style1$() })
  })
  return (
    <Container
      ref={ref}
      style={
        animating$() ? 'position: absolute;' : 'width: 100vw; height: 100vh'
      }
      // style={'position: absolute;'}
      // style={style$()}
    >
      This is a post
    </Container>
  )
}

const Container = styled('div')`
  /* min-height: 100vh;
  min-width: 100vw; */
  border: 1px solid black;
  border-radius: 5px;
  /* position: absolute; */
  background: red;
`
