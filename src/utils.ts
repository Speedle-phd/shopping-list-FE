import Cookies from 'universal-cookie';
import { redirect } from "react-router-dom"
import { AuthDataInterface, AxiosCustomErrorInterface, DatabaseItemListInterface, ErrorInterface } from './types/types';

// const BASEURL = "http://127.0.0.1:5173/"
const BASEURL = "https://chipper-tiramisu-891dd8.netlify.app/"

// export const isLoggedIn = async() => {
//    const cookies = new Cookies()
//    const user = cookies.get('panda-eats-cookies') 
//    if(!user) {
//       return redirect("/login")
//    }
//    return user
// }
export const loggedIn = async({request}:{request: Request}) => {
   if (
      request.url.endsWith('/login') ||
      request.url.endsWith('/register') ||
      request.url.endsWith('/forgot-password') ||
      request.url === BASEURL
   ) {
      const cookies = new Cookies()
      const user = cookies.get('panda-eats-cookies')
      if (!user) {
         return null
      }
      return redirect('/dashboard')
   }
   return null
}

export function isError(loaderObject: ErrorInterface | AuthDataInterface) : loaderObject is ErrorInterface{
   return (loaderObject as ErrorInterface)?.msg !== undefined
}

export interface EditFormValuesInterface {
   amount: string
   unit: string
   name: string
   company: string
   department: string
   completed: boolean
}
export const getFormValues = (form: HTMLFormElement) => {
   const formObj = new FormData(form)
   const dataObj = Object.fromEntries(formObj)
   // if(values && values.includes("")) return
   const isEmpty = !dataObj.name || !dataObj.unit || !dataObj.amount
   
   const amount = dataObj.amount + " " + dataObj.unit
   return { isEmpty, data: {
      name: dataObj.name,
      company: dataObj.company,
      department: dataObj.department,
      amount: amount,
      id: crypto.randomUUID(),
      completed: false,
   } }
}


   export function isDatabaseItemList(
      itemList: DatabaseItemListInterface | ErrorInterface
   ): itemList is DatabaseItemListInterface {
      if ('items' in itemList) {
         return true
      }
      return false
   }
   export function isAxiosCustomError(
      error: null | AxiosCustomErrorInterface
   ): error is AxiosCustomErrorInterface {
      if ('message' in error!) {
         return true
      }
      return false
   }

   export const cookies = new Cookies()