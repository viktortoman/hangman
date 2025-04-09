import {WordLengthButtonProps} from '../types';

export default function WordLengthButton({length, selected, onClick, fullWidth}: WordLengthButtonProps) {
    return (
        <button
            onClick={onClick}
            className={`p-3 border rounded text-2xl font-bold shadow-md transition-all duration-200 ${
                selected ? 'bg-black text-white rounded-none' : 'bg-white hover:bg-gray-100'
            } ${fullWidth ? 'col-span-3' : ''}`}
        >
            {length}
        </button>
    );
}
