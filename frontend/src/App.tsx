import { Route, Routes } from "react-router-dom";
import "./App.css";
import UserPage from "./pages/user-page";
import CreateUserPage from "./pages/create-user-page";
import EditUserPage from "./pages/edit-user-page";
import NotFoundPage from "./pages/not-found-page";
import { Toaster } from "react-hot-toast";

function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<UserPage />} />
                <Route path="/create" element={<CreateUserPage />} />
                <Route
                    path="/edit/:customerNumber"
                    element={<EditUserPage />}
                />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <Toaster position="top-center" />
        </div>
    );
}

export default App;
