import axios from 'axios'
import '../axios'
import {
   AxiosAuth,
   DatabaseItemListInterface,
   ItemListInterface,
} from '../types/types'
import { LoaderFunction, Params, defer, redirect } from 'react-router-dom'

export interface AxiosCustomError {
   response: {
      data: {
         msg: string
      }
      status: number
   }
}

export const loginActionLoader = async ({ request }: { request: Request }) => {
   const fd = await request.formData()
   const formData = Object.fromEntries([...fd.entries()])
   try {
      const res = await axios.post('/auth/login', {
         formData,
      })
      const { data } = res as AxiosAuth
      return data
   } catch (error) {
      const errorRes = (error as AxiosCustomError).response
      return { msg: errorRes?.data.msg, statuscode: errorRes?.status }
   }
}

export const registerActionLoader = async ({
   request,
}: {
   request: Request
}) => {
   const fd = await request.formData()
   const formData = Object.fromEntries([...fd.entries()])
   try {
      const res = await axios.post('/auth/register', {
         formData,
      })
      const { data } = res as AxiosAuth
      if (res.status !== 201) throw new Error()
      return data
   } catch (error) {
      const errorRes = (error as AxiosCustomError).response
      return { msg: errorRes.data.msg, statuscode: errorRes.status }
   }
}

export const resetActionLoader = async ({ request }: { request: Request }) => {
   const fd = await request.formData()
   const email = fd.get('email')?.toString()
   const emailRegex = new RegExp(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
   )
   if (!email) return { msg: 'Please provide an email address' }
   if (!email.match(emailRegex))
      return { msg: 'Please provide a valid email address' }
   try {
      await axios.patch('/auth/reset', { email })
      return redirect('/login')
   } catch (error) {
      const errorRes = (error as AxiosCustomError).response
      return { msg: errorRes.data.msg, statuscode: errorRes.status }
   }
}

export const getAllListsLoader = async () => {
   try {
      const res = await axios.get('/lists')
      return res.data
   } catch (error) {
      const errorRes = (error as AxiosCustomError).response
      throw { msg: errorRes.data.msg, statuscode: errorRes.status }
   }
}
export const addListAction = async ({ request }: { request: Request }) => {
   const fd = await request.formData()
   const data = Object.fromEntries(fd.entries())
   const adjData = { ...data, progress: 0, items: [] } as ItemListInterface
   try {
      const res = await axios.post('/lists', { payload: adjData })
      const { _id: listId } = res.data.newList
      return redirect(`/dashboard/collections/${listId}/edit`)
   } catch (error) {
      const errorRes = (error as AxiosCustomError).response
      return { msg: errorRes.data.msg, statuscode: errorRes.status }
   }
}

//loads a single list
export const listLoader: LoaderFunction = async ({ params }) => {
   try {
      const res = await axios(`/lists/${params.listId}`)
      return defer(res.data)
   } catch (error) {
      const errorRes = (error as AxiosCustomError).response
      throw { msg: errorRes.data.msg, statuscode: errorRes.status }
   }
}

//Loads all your collections at once
export const collectionsLoader = async () => {
   try {
      const { data } = await axios('/lists')

      return defer({ deferredData: data })
   } catch (error) {
      const errorRes = (error as AxiosCustomError).response
      throw { msg: errorRes.data.msg, statuscode: errorRes.status }
   }
}

export const dashboardCardLoader = async () => {
   try {
      let {
         data: { listData },
      } = await axios('/lists')
      listData = listData.sort(
         (a: DatabaseItemListInterface, b: DatabaseItemListInterface) => {
            if (a.updatedAt > b.updatedAt) {
               return -1
            } else if (a.updatedAt < b.updatedAt) {
               return 1
            } else {
               return 0
            }
         }
      )
      listData = listData.reduce(
         (
            total: DatabaseItemListInterface[],
            curr: DatabaseItemListInterface
         ) => {
            const { type } = curr
            if (!total.some((el) => el.type === type)) {
               total.push(curr)
               return total
            }
            if (total.length === 0) {
               total.push(curr)
               return total
            }
            return total
         },
         []
      )
      listData = listData.sort(
         (a: DatabaseItemListInterface, b: DatabaseItemListInterface) => {
            if (a.type > b.type) {
               return 1
            } else if (a.type < b.type) {
               return -1
            } else {
               return 0
            }
         }
      )
      const filledArray = Array.from({ length: 3 }, (_, k) => {
         if (!listData[k]) return null
         return listData[k]
      })

      return defer({ deferredData: filledArray })
   } catch (error) {
      const errorRes = (error as AxiosCustomError).response
      throw { msg: errorRes.data.msg, statuscode: errorRes.status }
   }
}

export const getAllFavorites = async () => {

   try {
      const res = await axios.get('/favorites')
      if (res.statusText !== 'OK') return
      const { data } = res
      return defer({ deferredData: data })
   } catch (error) {
      console.log(error)
      const errorRes = (error as AxiosCustomError).response
      throw { msg: errorRes.data.msg, statuscode: errorRes.status }
   }
}
export const getSingleFavorite = async ({ params }: { params: Params }) => {
   const {favoriteId: id} = params
   try {
      const res = await axios.get(`/favorites/item/${id}`)
      if (res.statusText !== 'OK') return
      const { data: favorites } = res
      return defer({ favorites })
   } catch (error) {
      const errorRes = (error as AxiosCustomError).response
      throw { msg: errorRes.data.msg, statuscode: errorRes.status }
   }
}
export const patchFavorite = async ({ params, request }: { params: Params, request: Request }) => {
   const formData = await request.formData()
   const {favoriteId: id} = params
   try {
      const res = await axios.patch(`/favorites/item/${id}`, {payload: Object.fromEntries(formData)})
      if (res.statusText !== 'OK') return
      return redirect("/dashboard/favorites")
   } catch (error) {
      const errorRes = (error as AxiosCustomError).response
      throw { msg: errorRes.data.msg, statuscode: errorRes.status }
   }
}

export const favoritesAction = async ({ request }: { request: Request }) => {
   const formData = await request.formData()
   try {
      const res = await axios.post('/favorites', {data: Object.fromEntries(formData)})
      if( res.statusText !== 'OK') return
      const { data } = res
      return data
   } catch (error) {
      const errorRes = (error as AxiosCustomError).response
      return { msg: errorRes.data.msg, statuscode: errorRes.status }
   }

}

