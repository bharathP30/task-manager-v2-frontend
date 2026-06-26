
export default function Searchbar ({searchterm, onSearchChange, statusFilter, onStatusChange}) {

    return (
        <div className="flex w-full p-2 border rounded-md bg-gray-400/20 border-white/10 backdrop-blur-lg md:max-w-xl md:mx-auto md:space-x-2 ">
                    
                     <select className="p-2 text-center text-black border rounded-md outline-none appearance-none border-white/10 bg-gray-300/10 w-fit"
                            name="statusFilter" id="statusFilter"
                            value={statusFilter}
                            onChange={(e)=>onStatusChange(e.target.value)}
                            >
                            <option value="">All</option>
                            <option value="true">Done</option>
                            <option value="false">Pending</option>
                     </select>
                    <input type="search"
                     className="flex-1 h-10 px-4 text-gray-100 bg-transparent border rounded-lg outline-none border-white/10 focus:ring-1 focus:ring-blue-500"
                     value={searchterm}
                     placeholder="Search tasks..."
                     onChange={(e)=>onSearchChange(e.target.value)}
                     />
        
                </div>
    )
}