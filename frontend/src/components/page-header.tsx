import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

type PageHeaderProps = {
    children: ReactNode;
};

export default function PageHeader(props: PageHeaderProps) {
    const navigate = useNavigate();

    return (
        <div className="page-header">
            <FontAwesomeIcon
                onClick={() => navigate("/")}
                id="arrow-icon"
                icon={faArrowLeft}
            />
            {props.children}
        </div>
    );
}
