import { MockItemList } from "./itemList"


export class MockItemListCollection {
   itemListCollection: MockItemList[]
   constructor() {
      this.itemListCollection = []
   }
   addItemList(itemList: MockItemList){
      this.itemListCollection.push(itemList)
   }
}