// app/providers.tsx
'use client'
import { useState } from 'react';

import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import {NextUIProvider} from '@nextui-org/react'

export function Providers({children}: { children: React.ReactNode }) {
  const [client] = useState(new QueryClient());
  return (
    <QueryClientProvider client={client}>
    <ReactQueryDevtools/>

    <NextUIProvider>
      {children}
    </NextUIProvider>

    </QueryClientProvider>
  )
}