import { Link } from "react-router-dom";
import { Button } from "./button";
import { useAuthContext } from "@/context/authContext";

const Nav = () => {

    const {state,setState} = useAuthContext();

    const handleLogout = () => {
        localStorage.removeItem("user");
        setState(null);
    }

    return (
        <div className="absolute mt-2 p-2 w-full flex justify-between items-center">
            <Link to="/">
                <span className="ml-5 text-3xl"> Z-Chat </span>
            </Link>
            {
                state?
                <div className="mr-3">
                    <Link to="/">
                            <Button className="rounded-full" onClick={handleLogout}>Logout</Button>
                    </Link>
                </div>:
                <div className="mr-3 flex gap-3">
                    <Link to="/login">
                        <Button className="rounded-full">Log In</Button>
                    </Link>
                    <Link to="/signup">
                        <Button className="rounded-full">Sign Up</Button>
                    </Link>
                </div>
            }
        </div>
    )
}

export default Nav;