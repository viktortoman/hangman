import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

export default function Loader() {
    return (
        <div className="flex flex-col items-center justify-center space-y-6 my-24">
            <FontAwesomeIcon icon={faSpinner} spin size="4x" className="text-gray-600" />
            <p className="text-xl font-semibold text-gray-700">Loading...</p>
        </div>
    );
}
