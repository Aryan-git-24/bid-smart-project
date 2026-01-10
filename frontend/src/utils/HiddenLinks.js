import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../redux/features/authSlice";
import { use } from "react";

export const ShowOnLogin = ({ children }) => {
    const isLoggedIn = useSelector(selectIsLoggedIn);

    if (isLoggedIn) {
        return <>{children}</>;
    }
    return null;
};

export const ShowOnLogOut = ({ children }) => {
    const isLoggedIn = useSelector(selectIsLoggedIn);

    if (isLoggedIn) {
        return <>{children}</>;
    }
    return null;
}