import { last } from 'lodash'
import { Component, createEffect, createSignal, JSXElement } from 'solid-js'
import { createStore } from 'solid-js/store'
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
    stack: [location.pathname],
    data: {},
  })

  createEffect(() => {
    console.log({ data: data$() })
  })

  type TRouterProps = {
    children: JSXElement
  }
  const Router = (p: TRouterProps) => {
    return <>{p.children}</>
  }

  type TRouteProps<K extends keyof T> = {
    path: K
    component: FC<T[K]>
  }
  const Route = <K extends keyof T>(p: TRouteProps<K>) => {
    return (
      <>
        {last(data$().stack) === p.path ? (
          <p.component {...(data$().data as any)} />
        ) : null}
      </>
    )
  }

  const useRouter = () => {
    return {
      navigate: <K extends keyof T>(path: K, data: T[K]) => {
        data$(d => ({ stack: [...d.stack, path as string], data }))
        // // path$(path as string)
        // setStore('path', path as string)
        // setStore('data', data)
      },
    }
  }

  return {
    useRouter,
    Router,
    Route,
  }
}

export const { useRouter, Router, Route } = createRouter<{
  '/profile': EmptyObj
  '/post': TPostProps
}>()
