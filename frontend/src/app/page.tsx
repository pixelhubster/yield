import Leftpanel from "@/components/leftpanel";
import Rightpanel from "@/components/rightpanel";
import Navbar from "@/components/navbar";


export default function Home() {
   return (
      <main className="w-full h-screen bg-[#F7F7FF] m-0 p-0">
         <Navbar />
         <div className="w-full flex flex-shrink" style={{ height: 'calc(100% - 5rem)'}}>
            <Leftpanel />
           <Rightpanel />
         </div>

      </main>
   );
}
