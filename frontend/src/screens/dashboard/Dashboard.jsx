import React, { useEffect } from "react";
import { Title } from "../../router";
import { CiMedal } from "react-icons/ci";
import { GiBarbedStar } from "react-icons/gi";
import { BsCashCoin } from "react-icons/bs";
import { MdOutlineCategory } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { HiOutlineUsers } from "react-icons/hi2";
import { useRedirectLoggedOutUser } from "../../hooks/useRedirectLoggedOutUser";
import { UseUserProfile } from "../../hooks/useUserProfile";
import { useDispatch, useSelector } from "react-redux";
import { getAllUser, getuserIncome, getuserProfile } from "../../redux/features/authSlice";
import { getAllProduct, getAllProductOfUser, getAllWonedProductOfUser } from "../../redux/features/productSlice";

export const Dashboard = () => {
   useRedirectLoggedOutUser("/login");
   const { role } = UseUserProfile();
   const { income, users } = useSelector((state) => state.auth);
   const { products, userproducts, wonedproducts } = useSelector((state) => state.product);
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(getuserProfile());
      dispatch(getuserIncome());
      dispatch(getAllProduct());
      dispatch(getAllWonedProductOfUser());
      dispatch(getAllProductOfUser());
      dispatch(getAllUser());
   }, [dispatch]);

   return (
      <>
         <section>
            <div className="shadow-s1 p-8 rounded-lg mb-12">
               <Title level={5} className="font-normal">
                  My Activity
               </Title>
               <hr className="my-5" />
               {role === "buyer" && <h1 className="text-2xl text-center font-semibold py-8 text-green">Please Become a Seller</h1>}
               {(role == "admin" || role === "seller") && (
                  <div className="grid grid-cols-3 gap-8 mt-8">
                     <div className="shadow-s3 border border-green bg-green_100 p-8 flex items-center text-center justify-center gap-5 flex-">
                        <BsCashCoin size={80} className="text-green" />
                        <div>
                           <Title level={1}>{income?.balance}</Title>
                           <Title>Balance</Title>
                        </div>
                     </div>
                     <div className="shadow-s3 border border-green bg-green_100 p-8 flex items-center text-center justify-center gap-5 flex-center">
                        <CiMedal size={80} className="text-green" />
                        <div>
                           <Title level={1}>{wonedproducts?.length}</Title>
                           <Title>Items Won</Title>
                        </div>
                     </div>
                     <div className="shadow-s3 border border-green bg-green_100 p-8 flex-center text-center justify-center gap-5 flex-item">
                        <MdOutlineCategory size={80} className="text-green" />
                        <div>
                           <Title level={1}>{userproducts?.length}</Title>
                           <Title>Your Products</Title>
                        </div>
                     </div>
                     {role === "admin" && (
                        <>
                           <div className="shadow-s3 border border-green_100 p-8 flex items-center text-center justify-center gap-5 flex">
                              <MdOutlineCategory size={80} className="text-green" />
                              <div>
                                 <Title level={1}>{products?.length}</Title>
                                 <Title>All Products</Title>
                              </div>
                           </div>
                           <div className="shadow-s3 border border-green_100 p-8 flex items-center text-center justify-center gap-5 flex">
                              <MdOutlineCategory size={80} className="text-green" />
                              <div>
                                 <Title level={1}>{users?.length}</Title>
                                 <Title>All Users</Title>
                              </div>
                           </div>
                        </>
                     )}
                  </div>
               )}
            </div>
         </section>
      </>
   );
};