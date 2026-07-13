export default function LogoutModal({ isWantToLogout, onLogout }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-6 p-8 text-white border rounded-xl bg-black/80 border-white/10 shadow-lg w-full max-w-sm">
            
                <span className="text-4xl">👋</span>
                <h2 className="text-2xl font-semibold">Log Out?</h2>
                <p className="text-sm text-white/50">You'll need to sign in again to access your tasks.</p>

                <div className="flex w-full gap-3 mt-2">
                    <button
                        onClick={() => isWantToLogout(false)}
                        className="flex-1 py-2 text-sm rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-200"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onLogout}
                        className="flex-1 py-2 text-sm rounded-lg bg-red-500/70 hover:bg-red-500 transition-all duration-200"
                    >
                        Log Out
                    </button>
                </div>

            </div>
        </div>
    )
}