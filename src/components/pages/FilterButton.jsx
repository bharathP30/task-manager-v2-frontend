export default function Filterbutton({ onClick, labelText }) {
    return (
        <button
        onClick={onClick}
            className={`text-md text-center px-4 rounded-full md:text-lg transition-all duration-300 hover:scale-105 bg-gray-600 text-gray-100`}
        >
            {labelText === '' ? 'All' : labelText}
        </button>
    );
}