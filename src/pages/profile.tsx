import { Img } from '../components'
import { TPost } from '../types'
import imgSrc from '../assets/images/kozo.jpeg'
import { For } from 'solid-js'
import { styled } from 'solid-styled-components'
import { useRef } from '../hooks'
import { useRouter } from '../contexts'

const data: TPost[] = new Array(20).fill(0).map((x, i) => ({
  createdAt: new Date(),
  img: imgSrc,
  description: 'Hello world! This is description',
  id: i + 1,
}))

export const Profile = () => {
  return (
    <Container>
      <For each={data}>{Post}</For>
    </Container>
  )
}

const Container = styled('div')`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
  margin: 0 auto;
  width: 95vw;
`

const Post = (p: TPost) => {
  const ref = useRef<HTMLDivElement>()

  const router = useRouter()

  return (
    <a
      href={'/post'}
      onClick={e => {
        e.preventDefault()

        // const width = ref.current.clientWidth
        // const windowWidth = window.innerWidth
        // const scale = windowWidth / width

        // const left = ref.current.offsetLeft
        // const widthDiff = ref.current.clientWidth * scale - width
        // const leftChange = -(left - widthDiff / 2) / scale

        // const top = ref.current.offsetTop
        // const heightDiff =
        //   ref.current.clientHeight * scale - ref.current.clientHeight
        // const topChange = -(top - heightDiff / 2) / scale

        // console.log({ left, widthDiff, leftAfterScale: leftChange })
        // ref.current.animate(
        //   {
        //     transform: `scale(${scale}) translate(${leftChange}px, ${topChange}px)`,
        //   },
        //   { duration: 300, fill: 'forwards' },
        // )

        router.navigate('/post', { ...p, from: ref.current })
      }}
    >
      <PostContainer ref={ref}>
        <Image src={p.img} />
        {/* <p>{p.createdAt.toDateString()}</p>
        <p>{p.description}</p> */}
      </PostContainer>
    </a>
  )
}

// const PostLinke = styled

const PostContainer = styled('div')`
  border: 1px solid black;
  border-radius: 5px;
  overflow: hidden;
  max-height: 200px;
  max-width: 200px;
  transform-origin: center;
`

const Image = styled('img')`
  width: 100%;
  height: 100%;
  /* max-height: 200px; */
`
