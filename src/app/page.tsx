import Leftpanel from "@/components/leftpanel";
import { FaSearch } from "react-icons/fa";


export default function Home() {
   return (
      <main className="w-full h-screen bg-white
      "> 

         <div className="w-full h-[5rem] bg-black flex justify-between items-center px-5 lg:px-10">
            <a href="http://" target="_blank" rel="noopener noreferrer">Yield</a>
            {/* <div>name</div> */}
            {/* <div>name</div> */}
            <div className="w-[50vw] lg:w-[40vw] h-[2.5rem] rounded-md bg-gray-300 overflow-hidden flex
            ">
               <input type="search" name="ens" id="" className="w-full h-full px-2 text-black outline-none focus:border-2 focus:border-blue-300 focus:border-solid" placeholder="ens.base.eth" />
               <button className="h-full w-fit bg-white hover:bg-gray-300 px-3">
                  <FaSearch fontSize={16} className="hover:cursor-pointer" />
               </button>
            </div>
            <div className="flex gap-5">
               <div className="flex justify-center items-center">
                  <FaSearch fontSize={16} className="hover:cursor-pointer" />
               </div>
               <a href="http://" target="_blank" rel="noopener noreferrer">Marketplace</a>
               <a href="http://" target="_blank" rel="noopener noreferrer">History</a>
               <a href="http://" target="_blank" rel="noopener noreferrer">Lending</a>
               <div className="bg-red-300">connectbtn</div>
            </div>
         </div>

         <div className="w-full h-[92vh] bg-blue-400 flex">
            <Leftpanel />
            <div className="w-full h-full bg-green-400 flex flex-col p-5">
               <div className="w-full h-full bg-white rounded-xl">hh</div>
               <div className="w-full h-[18rem] bg-yellow-200 mt-5">hh</div>
            </div>
         </div>

      </main>
   );
}
