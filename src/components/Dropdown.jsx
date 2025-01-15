import { FaCaretDown } from 'react-icons/fa';

const Dropdown = ({ options, selected, onSelect, width='w-44' }) => {
    return (
        <div className={`relative float-left group ${width} mx-1`}>
            <button 
                className="hover:underline underline-offset-8 rounded-md border-none outline-none py-3.5 px-4 inline-flex items-center gap-2 w-full" 
                style={{backgroundColor: selected !== options[0] ? '#333' : '#d1d5db',color: selected !== options[0] ? '#fff' : 'inherit',}}
            >
                {selected} <span className="ml-auto"><FaCaretDown /></span>
            </button>
            <div className="hidden group-hover:block absolute bg-brand-dark-gray min-w-auto shadow-dropdown z-10">
                {options.map((option) => (
                    <p
                        key={option}
                        className="hover:bg-[rgba(0,0,0,0.3)] block text-white py-2 px-4 text-left whitespace-nowrap cursor-pointer"
                        onClick={() => onSelect(option)}
                    >
                        {option}
                    </p>
                ))}
            </div>
        </div>
    )
}

export default Dropdown