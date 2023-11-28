import { createRoot } from 'react-dom/client'
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { Auth0Provider } from '@auth0/auth0-react'
import { toast } from 'react-hot-toast'
import { Suspense } from 'react'
import { lazy } from 'react'

import AppLayout from './components/AppLayout/AppLayout'
import ProtectedComponent from './components/UI/ProtectedComponent'
import Loading from './components/Loading/Loading'
import ErrorPage from './Pages/ErrorPage/ErrorPage'

const Home = lazy(() => import('./Pages/Home/Home'))
const FindFriends = lazy(() => import('./Pages/FindFriends/FindFriends'))
const MyFriends = lazy(() => import('./Pages/MyFriends/MyFriends'))
const ProfilePage = lazy(() => import('./Pages/ProfilePage/ProfilePage'))
const MySongs = lazy(() => import('./Pages/MySongs/MySongs'))
const ScanQR = lazy(() => import('./Pages/ScanQR/ScanQR'))
const ConfirmScan = lazy(() => import('./Pages/ConfirmScan/ConfirmScan'))
const AddSong = lazy(() => import('./Pages/AddSong/Songs'))

export const routes = createRoutesFromElements(
  <Route path="/" element={<AppLayout />} errorElement={<ErrorPage />}>
    <Route
      index
      element={
        <Suspense fallback={<Loading />}>
          <Home />
        </Suspense>
      }
    />
    <Route
      path="find-friends"
      element={
        <Suspense fallback={<Loading />}>
          <ProtectedComponent component={FindFriends} />
        </Suspense>
      }
    />
    <Route
      path="my-friends"
      element={
        <Suspense fallback={<Loading />}>
          <ProtectedComponent component={MyFriends} />
        </Suspense>
      }
    />
    <Route
      path="profile"
      element={
        <Suspense fallback={<Loading />}>
          <ProtectedComponent component={ProfilePage} />
        </Suspense>
      }
    />
    <Route
      path="my-songs"
      element={
        <Suspense fallback={<Loading />}>
          <ProtectedComponent component={MySongs} />
        </Suspense>
      }
    />
    <Route
      path="scan"
      element={
        <Suspense fallback={<Loading />}>
          <ProtectedComponent component={ScanQR} />
        </Suspense>
      }
    />
    <Route
      path="confirm-scan/:code"
      element={
        <Suspense fallback={<Loading />}>
          <ProtectedComponent component={ConfirmScan} />
        </Suspense>
      }
    />
    <Route
      path="add-song"
      element={
        <Suspense fallback={<Loading />}>
          <ProtectedComponent component={AddSong} />
        </Suspense>
      }
    />
  </Route>
)

function AppProvider() {
  return <RouterProvider router={createBrowserRouter(routes)} />
}

document.addEventListener('DOMContentLoaded', () => {
  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (error) => {
        if (error instanceof Error) {
          toast.error(`Something went wrong: ${error.message}`)
        }
      },
    }),
  })

  createRoot(document.getElementById('app') as HTMLElement).render(
    <Auth0Provider
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      domain={import.meta.env.VITE_AUTH0_DOMAIN as string}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID as string}
      cacheLocation="localstorage"
      authorizationParams={{
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        audience: import.meta.env.VITE_AUTH0_AUDIENCE as string,
        redirect_uri: `${window.location.origin}/my-friends`,
      }}
    >
      <QueryClientProvider client={queryClient}>
        <AppProvider />
      </QueryClientProvider>
    </Auth0Provider>
  )
})
