export default function ExpiryModal ({ onclick }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className='w-fit flex flex-col justify-end items-center gap-12 px-8 py-16 
                    font-sans text-center text-white border rounded-lg bg-black/70
                    border-white/20 backdrop-blur-lg shadow shadow-red-500 md:max-w-2xl md:px-12 md:py-24'>
                
                <h1 className="text-5xl flex-1 text-white font-semibold font-serif">Session Expired</h1>
                <p className="w-2/3">Your session has expired. To continue, please log in again</p>

                <button onClick={onclick}
                   className={`text-white text-lg font-mono mt-4 text-center p-2 rounded-md
                                transition-all duration-200 w-full md:mt-8
                            bg-green-500/70 cursor-pointer`} >
                            Go to Login page       
                </button>
            </div>
        </div>    
    )
}