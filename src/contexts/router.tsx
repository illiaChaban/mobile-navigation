import { last } from 'lodash'
import {
  Component,
  createEffect,
  createSignal,
  JSXElement,
  onMount,
  For,
} from 'solid-js'
import { createStore } from 'solid-js/store'
import { styled } from 'solid-styled-components'
import { useAtom } from '../hooks'
import { AnyObj, EmptyObj, FC, TPost, TPostProps } from '../types'

// export const useRouter = <T extends Record<string, TRoute<any, any>>(path: ) => {}

// type TRoute<T extends AnyObj, U extends AnyObj> = {
//   component: (p: T) => JSXElement
//   handleTransition?: (p: U) => void
// }
// type TRouteData<T extends TRoute<any, any>> = T extends TRoute<infer P1, any>
//   ? T extends TRoute<any, infer P2>
//     ? P1 & P2
//     : never
//   : never

// type TNonEmpty<T> = {[K in keyof T]: T[K] extends EmptyObj ? never : T[K]}

// type TNavigate<T> = {
//   <K extends keyof T,>(path: K, data: TRouteData<T[K]>) =>
// }

const createRouter = <T extends Record<string, AnyObj>>() => {
  // const [store, setStore] = createStore({
  //   path: location.pathname,
  //   data: {}
  // })
  // const path$ = useAtom(location.pathname)
  const data$ = useAtom({
    stack: [{ path: location.pathname, data: {} }],
  })

  createEffect(() => {
    console.log({ data: data$() })
  })

  type TRouterProps = {
    routes: {
      [K in keyof T]: {
        use: FC<T[K]>
      }
    }
  }
  const Router = (p: TRouterProps) => {
    onMount(() => console.log('router'))
    // return <>{p.children}</>

    return (
      <Container>
        <For each={data$().stack}>
          {({ path, data }) => {
            const Component = p.routes[path].use
            return (
              <PageContainer>
                <Component {...(data as any)} />
              </PageContainer>
            )
          }}
        </For>
      </Container>
    )
  }

  const Container = styled('div')`
    height: 100vh;
    width: 100vw;
  `
  const PageContainer = styled('div')`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  `

  const useRouter = () => {
    return {
      navigate: <K extends keyof T>(path: K, data: T[K]) => {
        data$(d => ({ stack: [...d.stack, { path: path as string, data }] }))
      },
    }
  }

  return {
    useRouter,
    Router,
  }
}

export const { useRouter, Router } = createRouter<{
  '/profile': EmptyObj
  '/post': TPostProps
}>()
