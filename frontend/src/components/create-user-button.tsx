import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

export default function CreateUserButton() {
    const navigate = useNavigate();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        navigate(`/create`);
    };

    return (
        <div>
            <button onClick={handleClick}>
                <div id="create-user-button-text">
                    <FontAwesomeIcon className="icon" icon={faPlus} /> Create
                </div>
            </button>
        </div>
    );
}
