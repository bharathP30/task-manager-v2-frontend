export default function SearchBar ({searchterm, onSearchChange, statusFilter, onStatusChange}) {
    return (
        <div 
        className="flex justify-center w-full gap-1 p-1 
        rounded-md bg-glass backdrop-blur-glass border border-glass-border
        md:gap-2 sm:max-w-lg sm:mx-auto">           
            
            <select className="flex-1 min-w-0 max-w-1/5 text-center text-text-muted bg-surface-elevated
            border border-glass-border rounded-md outline-none appearance-none "
                    name="statusFilter" id="statusFilter"
                    value={statusFilter}
                    onChange={(e)=>onStatusChange(e.target.value)}
                    >
                    <option value="">Status</option>
                    <option value="true">Done</option>
                    <option value="false">Pending</option>
            </select>

            <input type="search"
             className="flex-1 min-w-0 h-8 px-4 text-text-muted font-mono rounded-sm
             bg-glass outline-none border border-glass-border md:h-12
              focus:border-border-focus placeholder:font-extralight"
             value={searchterm}
             placeholder="Search tasks..."
             onChange={(e)=>onSearchChange(e.target.value)}
            />
        </div>
    )
}