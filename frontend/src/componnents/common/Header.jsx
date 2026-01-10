import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { IoSearchOutline } from "react-icons/io5";
import { Container, CustomNavLink, ProfileCard } from "../../router";
import { User1 } from "../hero/Hero";
import { menulists } from "../../utils/data";
import { ShowOnLogin, ShowOnLogOut } from "../../utils/HiddenLinks";
import { UseUserProfile } from "../../hooks/useUserProfile"
import { useDispatch, useSelector } from "react-redux";
import { getuserProfile, selectIsLoggedIn } from "../../redux/features/authSlice";

export const Header = () => {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();

    const menuRef = useRef(null);
    const { role } = UseUserProfile();
    const dispatch = useDispatch();

    const togglemenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenuOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    const handleScroll = () => {
        setIsScrolled(window.scrollY > 0);
    };

    useEffect(() => {
        document.addEventListener("mousedown", closeMenuOutside);
        window.addEventListener("scroll", handleScroll);

        return () => {
            document.removeEventListener("mousedown", closeMenuOutside);
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const isHomePage = location.pathname === "/";


    useEffect(() => {
        if (isLoggedIn) {
            dispatch(getuserProfile());
        }
    }, [dispatch, isLoggedIn]);

    return (
        <>
            <header className={isHomePage ? `header py-1 bg-green ${isScrolled ? "scrolled" : ""}` : `header bg-white shadow-s1 ${isScrolled}`}>
                <Container>
                    <nav className="p-4 flex justify-between items-center relative">
                        <div className="flex items-center gap-14">
                            <div>
                                {isHomePage && !isScrolled ? (
                                    <img src="../images/common/header-logo.png" alt="LogoImg" className="h-11" />
                                ) : (
                                    <img src="../images/common/header-logo2.png" alt="LogoImg" className="h-11" />
                                )}
                            </div>
                            <nav className="hidden md:flex gap-6 text-sm font-medium">
                                <a href="/Home.jsx" className="hover:text-gray-300">Home</a>
                                <a href="ProductList.jsx" className="hover:text-gray-300">Product</a>
                                <a href="#" className="hover:text-gray-300">Blog</a>
                                <a href="#" className="hover:text-gray-300">About</a>
                                <a href="#" className="hover:text-gray-300">Services</a>
                                <a href="#" className="hover:text-gray-300">Contact</a>
                            </nav>
                        </div>
                        <div className="hidden lh:flex items-center justify-between gap-8">
                            {menulists.map((list) => {
                                <li key={list.id} className="capitalize list-none">
                                    <CustomNavLink href={list.graph} isActive={location.pathname === list.path} className={`${isScrolled || !isHomePage}`}>
                                        {list.link}
                                    </CustomNavLink>
                                </li>
                            })}
                        </div>
                        <div className="flex items-center gap-8 icons">
                            <div className="hidden lg:flex lg:items-center lg:gap-8">
                                <IoSearchOutline size={23} className={`${isScrolled || !isHomePage ? "text-black" : "text-white"}`} />
                                {isLoggedIn && role === "buyer" && (
                                    <ShowOnLogin>
                                        <CustomNavLink href="/seller/login" className={`${isScrolled || !isHomePage ? "text-black":"text-white"}`}>
                                            Become a Seller
                                        </CustomNavLink>
                                    </ShowOnLogin>
                                )}
                                <ShowOnLogOut>
                                    <CustomNavLink href="login" className={`${isScrolled || !isHomePage ? "text-black":"text-white"}`}>
                                        Sign in
                                    </CustomNavLink>
                                    <CustomNavLink href="/register" className={`${isScrolled || !isHomePage ? "text-black":"text-white"} px-8 py-2 rounded`}>
                                        Join
                                    </CustomNavLink>
                                </ShowOnLogOut>
                                <ShowOnLogin>
                                    <CustomNavLink href="/dashboard">
                                        <ProfileCard>
                                            <img src={User1} alt="" className="w-full h-full object-cover" />
                                        </ProfileCard>
                                    </CustomNavLink>
                                </ShowOnLogin>
                            </div>
                            <div className="flex items-center gap-4">
                                <a href="/login" className="hover:text-gray-300 text-sm">Sign in</a>
                                <a href="/register"><button className="bg-white text-teal-900 font-medium px-4 py-1 rounded-full hover:bg-gray-100">Join</button></a>
                            </div>
                            <div className={`icon flex items-center justify-center gap-6 ${isScrolled || !isHomePage ? "text-primary" : "text-white"}`}>
                                <button onClick={togglemenu} className="lg:hidden w-10 h-10 flex justify-center items-center bg-black text-white form">
                                    {isOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
                                </button>
                            </div>
                        </div>
                    </nav>
                </Container>
            </header>
        </>
    )
}