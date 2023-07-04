import { MockItem } from "./item"

type MockFavoriteType = MockItem & {descriptor: string}

export class MockFavorites{
   favoriteList: MockFavoriteType[]
   constructor(public descriptor: string, public userId: string){
      this.favoriteList = []
   }
   addFavorite(item: MockItem){
      const newItem = {...item, descriptor: this.descriptor} as MockFavoriteType
      this.favoriteList.push(newItem)
   }
   removeFavorite(id: string){
      this.favoriteList = this.favoriteList.filter(fav => fav.id !== id)
   }
}