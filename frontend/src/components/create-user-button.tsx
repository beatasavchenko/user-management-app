import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Dialog from "./dialog";
import CreateUserForm from "./create-user-form";
import { useState } from "react";

export default function CreateUserButton() {
    const [open, setOpen] = useState(false);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setOpen(true);
    };

    return (
        <div>
            <button id="create-user-button" onClick={handleClick}>
                <div id="create-user-button-text">
                    <FontAwesomeIcon className="icon" icon={faPlus} /> Create
                </div>
            </button>
            <Dialog
                open={open}
                onClose={() => setOpen(!open)}
                title="Create a new user"
            >
                <CreateUserForm />
            </Dialog>
        </div>
    );
}
