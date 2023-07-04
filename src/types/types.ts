export interface UserInterface {
   username: string
   email: string
}

export interface AxiosAuth {
   data: {
      username?: string
      email: string
      password: string
   }
}
export interface Auth {
   user: UserInterface
}

export interface ErrorInterface {
   msg: string
   statuscode: number
}

export interface AuthDataInterface {
   user: {
      username?: string
      email: string
      password?: string
   }
   token?: string
}

//Dots on landing page
export interface BoxObject {
   i: number
   border: number
   color: number
   radius: number
   translateX: number
   translateY: number
   transitionX: string
   transitionY: string
}
//Interface for my ItemList Model
export interface ItemListInterface {
   title: string
   type: 'home' | 'misc' | 'food'
   progress: number
   items: []
}

export interface DatabaseItemListInterface extends ItemListInterface {
   _id: number
   __v?: number
   updatedAt: Date
   createdAt: Date
   createdBy: string
}
export interface DataInterface {
   listData: DatabaseItemListInterface[]
}

export interface CollectionItemsInterface {
   amount: string
   name: string
   company: string
   department: string
   completed: boolean
   id: string
}

export interface AxiosCustomErrorInterface {
   message: string
   code?: string
}

export interface FavoritesInterface {
   name: string
   createdBy: string
   company?: string
   department?: string
   _id?: string
   createdAt?: Date
   updatedAt?: Date
}