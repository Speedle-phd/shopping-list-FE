import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import RootLayout from './layouts/RootLayout'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import {
   ChakraBaseProvider,
   extendTheme,
   type ThemeConfig
} from '@chakra-ui/react'
import AuthLayout from './layouts/AuthLayout'
import Hero from './pages/Hero'
import Login from './pages/Login'
import { loggedIn } from './utils'
import { addListAction, collectionsLoader, dashboardCardLoader, favoritesAction, getAllFavorites, getSingleFavorite, listLoader, loginActionLoader, patchFavorite, registerActionLoader, resetActionLoader } from './api/loader.ts'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthContextProvider from './context/AuthContextProvider.tsx'
import AddNewListForm from './pages/AddNewListForm.tsx'
import Collections from './pages/Collections.tsx'
import Settings from './pages/Settings.tsx'
import Reset from './pages/Reset.tsx'
import EditList from './pages/EditList.tsx'
import List from './pages/List.tsx'
import LoaderFail from './components/LoaderFail.tsx'
import { checkboxTheme } from './chakraThemes/Checkbox.ts'
import Favorites from './pages/Favorites.tsx'
import EditFavorites from './pages/EditFavorites.tsx'




const config : ThemeConfig = {
   initialColorMode: 'light',
   useSystemColorMode: false,
}
const theme = extendTheme({
   config,
   // ...spacing,
   components: { Checkbox: checkboxTheme },
})

const router = createBrowserRouter([
   {
      path: 'dashboard',
      element: <RootLayout />,
      children: [
         {
            index: true,
            element: <Home />,
            loader: dashboardCardLoader,
            errorElement: <LoaderFail />,
         },
         {
            path: 'add-list',
            element: <AddNewListForm />,
            action: addListAction,
         },
         {
            path: 'collections',
            element: <Collections />,
            errorElement: <LoaderFail />,
            loader: collectionsLoader,
         },
         {
            path: 'collections/:listId',
            element: <List />,
            loader: listLoader,
            errorElement: <LoaderFail />,
         },
         {
            path: 'collections/:listId/edit',
            element: <EditList />,
            loader: listLoader,
         },
         {
            path: 'settings',
            element: <Settings />,
            loader: async () => true,
         },
         {
            path: 'favorites',
            element: <Favorites />,
            loader: getAllFavorites,
            action: favoritesAction,
            // errorElement: <LoaderFail />,
         },
         {
            path: 'favorites/:favoriteId',
            element: <EditFavorites />,
            loader: getSingleFavorite,
            action: patchFavorite,
         },
      ],
   },
   {
      path: '/',
      element: <AuthLayout />,
      loader: loggedIn,
      children: [
         {
            index: true,
            element: <Hero />,
            loader: loggedIn,
         },
         {
            path: 'login',
            element: <Login />,
            action: loginActionLoader,
         },
         {
            path: 'register',
            element: <Login />,
            action: registerActionLoader,
         },
         {
            path: 'forgot-password',
            element: <Reset />,
            action: resetActionLoader,
         },
         {
            path: '*',
            element: <NotFound />,
         },
      ],
   },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
   <React.StrictMode>
      <ChakraBaseProvider theme={theme}>
         <AuthContextProvider>
            <RouterProvider router={router} />
         </AuthContextProvider>
      </ChakraBaseProvider>
   </React.StrictMode>
)
