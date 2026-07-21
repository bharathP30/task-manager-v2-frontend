export default function ExpiryModal ({ onclick }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center p-4 bg-background/80 backdrop-blur-blurry">

            <div className='flex w-full flex-col items-center gap-6 p-8 text-text text-center 
                    font-sans rounded-xl bg-surface border border-glass-border backdrop-blur-blurry
                    md:max-w-2xl md:p-16 max-w-sm'>
                
                <h1 className="text-3xl flex-1 text-text font-semibold">Session Expired</h1>
                <p className="text-sm text-text-muted">Your session has expired. To continue, please log in again</p>

                <button onClick={onclick}
                   className={`text-text text-lg font-mono mt-4 text-center p-2 rounded-md
                                transition-all duration-normal w-full md:mt-8
                            bg-success cursor-pointer`} >
                            Go to Login page       
                </button>
            </div>
        </div>    
    )
}