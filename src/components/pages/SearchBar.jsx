export default function SearchBar ({searchterm, onSearchChange, statusFilter, onStatusChange}) {
    return (
        <div className="flex justify-center gap-2 w-full p-2 border rounded-lg bg-gray-400/20 border-white/10 backdrop-blur-lg md:max-w-lg md:mx-auto md:space-x-2 ">           
            
            <select className="flex-1 min-w-0 max-w-1/5 text-center text-black border rounded-md outline-none appearance-none border-white/10 bg-gray-300/10"
                    name="statusFilter" id="statusFilter"
                    value={statusFilter}
                    onChange={(e)=>onStatusChange(e.target.value)}
                    >
                    <option value="">Status</option>
                    <option value="true">Done</option>
                    <option value="false">Pending</option>
            </select>

            <input type="search"
             className="flex-1 min-w-0 h-10 px-4 text-gray-100 bg-transparent border rounded-md outline-none border-white/10 focus:ring-1 focus:ring-blue-500"
             value={searchterm}
             placeholder="Search tasks..."
             onChange={(e)=>onSearchChange(e.target.value)}
            />
        </div>
    )
}