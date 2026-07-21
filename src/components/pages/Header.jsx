export default function Header ({ setIsWantToLogout }) {
  return (
    <>
      <div className='flex items-center justify-between px-2 my-2 mx-auto gap-2 w-full md:max-w-2xl'>
        <h1 className="flex-1 font-sans text-2xl font-semibold text-text md:text-4xl md:my-8">Task Manager</h1>
        <button onClick={() => setIsWantToLogout(true)} 
          className='px-3 py-1 text-md rounded-sm min-w-0 md:text-lg
          cursor-pointer text-text-muted bg-glass border border-glass-border backdrop-blur-glass
           hover:scale-105 hover:bg-glass-hover active:bg-surface transition-all duration-normal'>
            Log out
        </button>
    </div>
    </>
  )
} 