export default function Header ({ setIsWantToLogout }) {
  return (
    <>
      <div className='flex items-center justify-between w-full mx-auto md:max-w-3xl'>
      <h1 className="flex-1 my-6 font-sans text-2xl font-semibold text-white/80 md:text-4xl">Task Manager</h1>
        <button onClick={() => setIsWantToLogout(true)} 
          className='px-4 py-2 text-md transition-all duration-700 rounded-md 
          cursor-pointer w-fit text-white/80 bg-black/40 backdrop-blur-2xl
           border-white/20 hover:scale-105 active:bg-gray-700'>
            Log out
        </button>
    </div>
    </>
  )
} 