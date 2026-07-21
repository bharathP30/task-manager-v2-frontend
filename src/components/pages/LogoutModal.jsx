export default function LogoutModal({ isWantToLogout, onLogout }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center p-4 bg-background/80 backdrop-blur-blurry">
            <div className="flex flex-col items-center gap-6 p-8 text-text rounded-xl 
            bg-surface border border-glass-border shadow-lg w-full max-w-sm">
            
                <span className="text-4xl">👋</span>
                <h2 className="text-2xl font-semibold">Log Out?</h2>
                <p className="text-sm text-text-muted">You'll need to sign in again to access your tasks.</p>

                <div className="flex w-full gap-3 mt-2">
                    <button
                        onClick={() => isWantToLogout(false)}
                        className="flex-1 py-2 text-sm rounded-md bg-surface-elevated
                         hover:bg-surface-hover focus:bg-surface-hover transition-all duration-normal"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onLogout}
                        className="flex-1 py-2 text-sm rounded-md bg-danger/80 hover:bg-danger focus:bg-danger transition-all duration-normal"
                    >
                        Log Out
                    </button>
                </div>

            </div>
        </div>
    )
}