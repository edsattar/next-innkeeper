'use client'

import {NextUIProvider as Provider} from '@nextui-org/react'

export default function NextUIProvider({children}: { children: React.ReactNode }) {
  return (
    <Provider>
      {children}
    </Provider>
  )
}