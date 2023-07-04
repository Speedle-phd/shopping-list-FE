

export class MockItem {
   constructor(
      public name: string,
      public purchased: boolean = false,
      public company?: string,
      public department?: string,
      public amount: string = "1 Stück",
      public id: string = crypto.randomUUID(),
   ) {}
   set togglePurchased(v: boolean) {
      this.purchased == v
   }
}  