import { FaFacebook, FaGoogle } from "react-icons/fa";
import { Caption, Container, CustomNavLink, Loader, PrimaryButton, Title } from "../../router";
import { commonClassNameOfInput } from "../../componnents/common/Design";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify"
import { loginUserAsSeller } from "../../redux/features/authSlice";

const initialState = {
    email: "",
    password: "",
};

export const LogAsSeller = () => {
    const dispatch = useDispatch();
    const [formData, setformDtat] = useState(initialState);
    const { email, password, confirmpassword } = formData;
    const { isLoading } = useSelector(state => state.auth);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setformDtat({ ...formData, [name]: value });
    };

    const handleLogin = (e) => {
        e.preventDefault();

        if (!email || !password) {
            return toast.error("All fields are required");
        }

        const userData = { email, password };
        dispatch(loginUserAsSeller(userData));
    };

    return (
        <>
            {isLoading && <Loader />}
            <section className="register pt-16 relative">
                <div className="bg-green w-96 h-96 rounded-full opacity-20 blur-3xl absolute top-2/3"></div>
                <div className="bg-[#241C37] pt-8 h-[40vh] relative content"></div>
                <Container>
                    <div>
                        <Title level={3} className="text-white">
                            Login Seller
                        </Title>
                        <div className="flex items-center gap-3">
                            <Title level={3} className="text-white font-normal text-xl">
                                Name
                            </Title>
                            <Title level={3} className="text-white font-normal text-xl">
                                /
                            </Title>
                            <Title level={3} className="text-white font-normal text-xl">
                                Seller
                            </Title>
                        </div>
                    </div>
                </Container>
                <form onSubmit={handleLogin} className="bg-white shadow-s3 w-1/3 m-auto my-16 p-8 rounded-xl">
                    <div className="text-center">
                        <Title level={5}>New Seller Member</Title>
                        <p className="mt-2 text-lg">
                            Do you already have an account? <CustomNavLink href="/create-account">Signup Here</CustomNavLink>
                        </p>
                    </div>
                    <div className="py-5 mt-8">
                        <Caption className="mb-2">Enter Your Email</Caption>
                        <input type="email" name="email" value={email} onChange={handleInputChange} className={commonClassNameOfInput} placeholder="Enter Your Email" />
                    </div>
                    <div>
                        <Caption className="mb-2">Password</Caption>
                        <input type="password" name="password" value={password} onChange={handleInputChange} className={commonClassNameOfInput} placeholder="Enter Your Password" />
                    </div>
                    <div className="flex items-center gap-2 py-4">
                        <input type="checkbox" />
                        <Caption>I agree to the Terms & Policy</Caption>
                    </div>
                    <PrimaryButton className="w-full rounded-none my-5 uppercase">Become Seller</PrimaryButton>
                    <div className="text-center border py-4 rounded-lg mt-4">
                        <Title>OR SIGNIN WITH</Title>
                        <div className="flex items-center justify-center gap-5 mt-5">
                            <button className="flex items-center gap-2 bg-red-500 text-white p-3 px-5 rounded-sm">
                                <FaGoogle />
                            </button>
                        </div>
                    </div>
                </form>
            </section>
        </>
    );
};