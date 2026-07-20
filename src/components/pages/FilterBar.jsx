export default function FilterBar ({filterPrio, setFilterPrio, filterCat, setFilterCat }) {
       return (
              <div className="flex gap-2 p-2 my-4 border rounded-md bg-gray-400/20
               border-white/10 backdrop-blur-lg md:mx-auto">
                     
                     <select className="flex-1 px-2 text-center text-black border 
                            min-w-0 rounded-md outline-none
                            appearance-none border-white/10 bg-gray-300/10"

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
                     
                     <select className="flex-1 px-2 text-center text-black border 
                     min-w-0 rounded-md outline-none 
                     appearance-none border-white/10 bg-gray-300/10"

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