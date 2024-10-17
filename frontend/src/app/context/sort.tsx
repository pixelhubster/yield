

export const sortExplorer = (obj: any) => {
   let newArray: any[] = [];
   let list: any[] = [];
   Object.entries(obj).forEach(([key, value]) => {
      // newArray = [...newArray, ...value as any]
      switch (key) {
         case "burnYields":
            (value as any).forEach((element: any) => {
               list.push({
                  ...element,
                  method: "Action",
                  type: "Yield Burned",
               })
            });
            break;

         case "loanLiquidateds":
            (value as any).forEach((element: any) => {
               list.push({
                  ...element,
                  method: "Action",
                  type: "Activity Log",
               })
            });

            break;

         case "loanRepayeds":
            (value as any).forEach((element: any) => {
               list.push({
                  ...element,
                  method: "Action",
                  type: "Loan repaid",
               })
            });
            break;

         case "sharePurchaseds":
            (value as any).forEach((element: any) => {
               list.push({
                  ...element,
                  method: "Action",
                  type: "Share Purchased",
               })
            });
            break;

         case "yieldListeds":
            (value as any).forEach((element: any) => {
               list.push({
                  ...element,
                  method: "Action",
                  type: "Yield Listed",
               })
            });
            break;

         case "yieldLoaneds":
            (value as any).forEach((element: any) => {
               list.push({
                  ...element,
                  method: "Action",
                  type: "Borrowed",
               })
            });
            break;
         case "yieldMinteds":
            (value as any).forEach((element: any) => {
               list.push({
                  ...element,
                  method: "Action",
                  type: "Minted Yield",
               })
            });
            break;

         default:
            break;
      }
   })
   const sorted = list.sort((a,b) => b.blockTimestamp - a.blockTimestamp)
   console.log(list)
   console.log(sorted)
   return sorted
}