export default function LogoutModal ({ isWantToLogout, onLogout }) {

    return (
        <div className="fixed inset-0 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">

            <div
         className='flex flex-col items-center justify-end gap-12 px-8 py-16 font-sans text-center text-white border rounded-lg shadow-md w-fit bg-black/70 border-white/20 shadow-red-500 md:max-w-2xl md:px-12 md:py-24'>
            <h1 className="flex-1 font-serif text-5xl font-semibold text-white">Log Out?</h1>

            <p className="w-2/3">Are you sure you want to logout?</p>
            
            <div className="flex items-center justify-center gap-4">
                <button onClick={() => isWantToLogout(false)}
               className={`text-white text-lg font-mono mt-4 text-center px-4 py-2 rounded-md
                            transition-all duration-200 w-fit md:mt-8
                        bg-gray-500/70 cursor-pointer`}
                    >
                        No   
                </button>
                
                <button onClick={onLogout}
               className={`text-white text-lg font-mono mt-4 text-center px-4 py-2  rounded-md
                            transition-all duration-200 flex-1 md:mt-8
                        bg-green-500/70 cursor-pointer`}
                    >
                        Yes, I want to   
                </button>
            </div>
            
            </div>
        </div>
        
    )
}