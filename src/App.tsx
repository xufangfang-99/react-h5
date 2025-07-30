// App.tsx
import { useRoutes } from 'react-router-dom'
import routes from './routes'
import { Suspense } from 'react'

export default function App() {
  const element = useRoutes(routes)
  return (
    <Suspense fallback={<div>加载中...</div>}>
      {element}
    </Suspense>
  )
}
