import { Children, useEffect } from "react";
import { Sidebar } from "../../admin/sidebar";
import { Container } from "../Design";
import { useDispatch } from "react-redux";
import { UseUserProfile } from "../../../hooks/useUserProfile";
import { getuserProfile } from "../../../redux/features/authSlice";
import { useLocation } from "react-router-dom";

export const DashboardLayout = ({ Children }) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const { role, isLoggedIn } = UseUserProfile();

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(getuserProfile());
        }
    }, [location, dispatch, isLoggedIn]);

    return (
        <>
            <div className="'mt-32">
                <Container className="flex">
                    <div className={'$role==="admin"? "h-[110vh]":role==="seller"?"h-[80vh]":"h-[80vh]"}w-[25%] shadow-s1 py-8 p-5 rounded-lg'}>
                        <Sidebar role={role} />
                    </div>
                    <div className="w-[75%] px-5 ml-10 rounded-lg"></div>
                </Container>
            </div>
        </>
    );
};