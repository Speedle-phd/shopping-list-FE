import { MockItem } from './item'

export class MockItemList {
   itemList: MockItem[]
   progress: number
   timestamp: Date
   listId: string
   constructor(public descriptor: "food" | "home" | "pet" | "misc", public title: string) {
      this.itemList = []
      this.progress = 0
      this.timestamp = new Date()
      this.listId = crypto.randomUUID()
   }
   addItem(item: MockItem) {
      this.itemList.push(item)
      this.updateProgress()
   }
   removeItem(id: string) {
      this.itemList = this.itemList.filter((item) => item.id !== id)
      this.updateProgress()
   }
   updateItem(id: string, key: keyof MockItem, newValue: string) {
      const toUpdatedItem = this.itemList.find((item) => item.id === id)
      const updatedItem = { ...toUpdatedItem, [key]: newValue } as MockItem
      this.itemList = this.itemList.filter((item) => item.id !== id)
      this.itemList.push(updatedItem)
      if(key === "purchased"){
         this.updateProgress()
      }
   }
   updateProgress() {
      this.progress =
         (this.itemList.reduce((total, curr) => {
            if (!curr.purchased) return total
            total++
            return total
         }, 0) /
            this.itemList.length) *
         100
   }
   get getProgress() {
      this.progress =
         (this.itemList.reduce((total, curr) => {
            if (!curr.purchased) return total
            total++
            return total
         }, 0) /
            this.itemList.length) *
         100
      return this.progress
   }
}
