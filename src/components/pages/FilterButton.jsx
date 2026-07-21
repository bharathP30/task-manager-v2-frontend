export default function Filterbutton({ onClick, labelText }) {
    return (
        <button
        onClick={onClick}
            className={`text-md text-center px-4 rounded-full md:text-lg transition-all duration-normal hover:scale-105 bg-surface-elevated text-text-muted`}
        >
            {labelText === '' ? 'All' : labelText}
        </button>
    );
}