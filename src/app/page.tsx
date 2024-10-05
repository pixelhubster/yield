import Leftpanel from "@/components/leftpanel";
import { FaSearch } from "react-icons/fa"; 
import Rightpanel from "@/components/rightpanel";
import Navbar from "@/components/navbar";


export default function Home() {
   return (
      <main className="w-full h-screen bg-white
      ">
         <Navbar />
         <div className="w-full h-[92vh] bg-blue-400 flex ">
            <Leftpanel />
           <Rightpanel />
         </div>

      </main>
   );
}
