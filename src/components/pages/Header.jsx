
const Header = ({ isWantToLogout }) => {
  return (
    <>
      <div className='flex items-center justify-between w-full mx-auto my-4 md:max-w-3xl'>
      <h1 className="flex-1 my-6 font-sans text-4xl font-semibold text-white/80">Task Manager</h1>
      <button onClick={() => isWantToLogout(true)} className='px-4 py-2 text-lg transition-all duration-700 rounded-md cursor-pointer w-fit text-white/80 bg-black/40 backdrop-blur-2xl border-white/20 hover:scale-105 active:bg-gray-700'>Log out</button>
    </div>
    </>
  )
}

export default Header
