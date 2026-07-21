export default function FilterBar ({filterPrio, setFilterPrio, filterCat, setFilterCat }) {
       return (
              <div className="flex flex-1 gap-1 p-1 rounded-md
                     bg-glass backdrop-blur-glass border border-glass-border">
                     
                     <select 
                     className="flex-1 min-w-0 md:p-1
                     bg-surface-elevated text-center text-text-muted  
                             border border-glass-border rounded-md outline-none appearance-none"

                            name="filterCategory" id="filterCategory"
                            value={filterCat}
                            onChange={(e)=>setFilterCat(e.target.value)} >
                                   <option value="">Category</option>
                                   <option value="personal">Personal</option>
                                   <option value="school">School</option>
                                   <option value="work">Work</option>
                                   <option value="shopping">Shopping</option>
                                   <option value="others">Others</option>
                     </select>
                     
                     <select className="flex-1 min-w-0 md:p-1
                     bg-surface-elevated text-center text-text-muted  
                             border border-glass-border rounded-md outline-none appearance-none"

                            name="filterPriority" id="filterPriority"
                            value={filterPrio}
                            onChange={(e)=>setFilterPrio(e.target.value)} >
                                   <option value="">Priority</option>
                                   <option value="high">High</option>
                                   <option value="medium">Medium</option>
                                   <option value="low">Low</option>
                     </select>
              </div>
       )
}