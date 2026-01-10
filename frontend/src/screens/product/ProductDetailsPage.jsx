import { Body, Caption, Container, DateFormatter, Loader, Title } from "../../router";
import { IoIosStar, IoIosStarHalf, IoIosStarOutline } from "react-icons/io";
import { commonClassNameOfInput } from "../../componnents/common/Design";
import { AiOutlinePlus } from "react-icons/ai";
import { act, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProduct } from "../../redux/features/productSlice";
import { fetchBiddingHistory, placebid } from "../../redux/features/biddingSlice";
import { toast } from "react-toastify";

export const ProductsDetailsPage = () => {
   const dispatch = useDispatch();
   const { id } = useParams();
   const { product, isLoading } = useSelector((state) => state.product);
   const { history } = useSelector((state) => state.bidding.history);

   const [rate, setRate] = useState(0);
   const [activeTab, setActiveTab] = useState("description");

   useEffect(() => {
      dispatch(getProduct(id));
   }, [dispatch, id]);

   useEffect(() => {
      if (product && !product.isSoldout) {
         dispatch(fetchBiddingHistory(id));
      }
   }, [dispatch, id, product]);

   useEffect(() => {
      if (history && history.length > 0) {
         const highestBid = Math.max(...history.map((bid) => bid.price));
         setRate(highestBid);
      }
      else if (product) {
         setRate(product.price);
      }
   }, [history, product]);

   const increaseBid = () => {
      setRate((prevRate) => prevRate + 1);
   };

   const handleTabClick = (tab) => {
      setActiveTab(tab);
   };

   const save = async (e) => {
      e.preventDefault();

      if (product.price > rate) {
         return toast.error("Your bid must be equal to or higher than the product price");
      }

      const formData = {
         price: rate,
         productId: id,
      };

      try {
         await dispatch(placebid(formData)).unwrap();
         dispatch(fetchBiddingHistory(id));
      } catch (error) {
         return toast.error("An error occurred while placing bid");
      }
   };

   if (isLoading) {
      return <Loader />;
   }

   return (
      <>
         <section className="pt-24 px-8">
            <Container>
               <div className="flex justify-between gap-8">
                  <div className="w-1/2">
                     <div className="h-[70vh]">
                        <img src={product?.image?.filePath} alt="" className="w-full h-full object-corner" />
                     </div>
                  </div>
                  <div className="w-1/2">
                     <Title level={2} className="capitalize">
                        {product?.title}
                     </Title>
                     <div className="flex gap-5">
                        <div className="flex text-green">
                           <IoIosStar size={20} />
                           <IoIosStar size={20} />
                           <IoIosStar size={20} />
                           <IoIosStarHalf size={20} />
                           <IoIosStarOutline size={20} />
                        </div>
                        <Caption>(2 customer reviews)</Caption>
                     </div>
                     <br />
                     <Body>{product?.description.slice(0, 150)}</Body>
                     <br />
                     <Caption>Item Verified: {product?.isVerified ? "Yes" : "No"}</Caption>
                     <br />
                     <Caption>Time left:</Caption>
                     <br />
                     <div className="flex gap-8 text-center">
                        <div className="p-5 px-10 shadow-s1">
                           <Title level={4}>149</Title>
                           <Caption>Day</Caption>
                        </div>
                        <div className="p-5 px-10 shadow-s1">
                           <Title level={4}>12</Title>
                           <Caption>Hours</Caption>
                        </div>
                        <div className="p-5 px-10 shadow-s1">
                           <Title level={4}>36</Title>
                           <Caption>Minutes</Caption>
                        </div>
                        <div className="p-5 px-10 shadow-s1">
                           <Title level={4}>51</Title>
                           <Caption>Seconds</Caption>
                        </div>
                     </div>
                     <br />
                     <Title className="flex items-center gap-2">
                        Auction ends:
                        <Caption><DateFormatter date={product?.createdAt} /></Caption>
                     </Title>
                     <Title className="flex items-center gap-2 my-5">
                        Time Zone:
                        <Caption>UTC 0</Caption>
                     </Title>
                     <Title className="flex items-center gap-2 my-5">
                        Price:
                        <Caption>{product?.price}</Caption>
                     </Title>
                     <Title className="flex items-center gap-2">
                        Current bid:
                        <Caption className="text-3xl">{rate}</Caption>
                     </Title>
                     <div className="p-5 px-10 shadow-s3 py-8">
                        <form onSubmit={save} className="flex gap-3 justify-between">
                           <input type="number" name="price" className={commonClassNameOfInput} value={rate} onChange={(e) => setRate(e.target.value)}
                              min={product?.price} />
                           <button type="button" onClick={increaseBid} className="bg-gray-100 rounded-md px-5 py-3">
                              <AiOutlinePlus />
                           </button>
                           <button type="submit" className={`py-3 px-8 rounded-lg ${product?.isSoldout || !product?.isVerified ? "bg-gray-400 text-gray-700 cursor-not-allowed":"bg-green text-white"}`}
                              disabled={product?.isSoldout || !product?.isVerified}>
                              Submit
                           </button>
                        </form>
                     </div>
                  </div>
               </div>
               <div className="details mt-8">
                  <div className="flex items-center gap-5">
                     <button className={'rounded-md px-10 py-4 text-black shadow-s3 ${activeTab==="description" ? "bg-green text-white":}'}>
                        Description
                     </button>
                     <button className={'rounded-md px-10 py-4 text-black shadow-s3 ${activeTab==="auctionHistory" ? "bg-green text-white":}'}>
                        Auction History
                     </button>
                     <button className={'rounded-md px-10 py-4 text-black shadow-s3 ${activeTab==="reviews" ? "bg-green text-white":}'}>
                        Reviews(2)
                     </button>
                     <button className={'rounded-md px-10 py-4 text-black shadow-s3 ${activeTab==="moreProducts" ? "bg-green text-white":}'}>
                        More Products
                     </button>
                  </div>
                  <div className="tab-content mt-8">
                     {activeTab === "description" && (
                        <div className="description-tab shadow-s3 p-8 rounded-md">
                           <Title level={4}>Description</Title>
                           <br />
                           <Caption className="leading-7">{product?.description}</Caption>
                           <br />
                           <Title level={4}>Product Overview</Title>
                           <div className="flex justify-between gap-5">
                              <div className="mt-4 capitalize w-1/2">
                                 <div className="flex justify-between border-b py-3">
                                    <Title>Category</Title>
                                    <Caption>{product?.category}</Caption>
                                 </div>
                                 <div className="flex justify-between border-b py-3">
                                    <Title>height</Title>
                                    <Caption>{product?.height} (cm)</Caption>
                                 </div>
                                 <div className="flex justify-between border-b py-3">
                                    <Title>length</Title>
                                    <Caption>{product?.length} (cm)</Caption>
                                 </div>
                                 <div className="flex justify-between border-b py-3">
                                    <Title>width</Title>
                                    <Caption>{product?.width} (cm)</Caption>
                                 </div>
                                 <div className="flex justify-between border-b py-3">
                                    <Title>weight</Title>
                                    <Caption>{product?.weight} (kg)</Caption>
                                 </div>
                                 <div className="flex justify-between border-b py-3">
                                    <Title>medium used</Title>
                                    <Caption>{product?.mediumused}</Caption>
                                 </div>
                                 <div className="flex justify-between border-b py-3">
                                    <Title>Price</Title>
                                    <Caption>${product?.price}</Caption>
                                 </div>
                                 <div className="flex justify-between border-b py-3">
                                    <Title>Sold out</Title>
                                    {product?.isSoldout ? <Caption>Sold out</Caption> : <Caption>On Stock</Caption>}
                                 </div>
                                 <div className="flex justify-between border-b py-3">
                                    <Title>verify</Title>
                                    {product?.isVerified ? <Caption>Yes</Caption> : <Caption>No</Caption>}
                                 </div>
                                 <div className="flex justify-between border-b py-3">
                                    <Title>Create At</Title>
                                    <Caption><DateFormatter date={product?.createdAt} /></Caption>
                                 </div>
                                 <div className="flex justify-between border-b py-3">
                                    <Title>Update At</Title>
                                    <Caption><DateFormatter date={product?.updateAt} /></Caption>
                                 </div>
                              </div>
                              <div className="w-1/2">
                                 <div className="h-[60vh] p-2 bg-green rounded-xl">
                                    <img src={product?.image?.filePath} alt="" className="w-full h-full object-cover rounded-xl" />
                                 </div>
                              </div>
                           </div>
                        </div>
                     )}
                     {activeTab === "auctionHistory" && <AuctionHistory history={history} />}
                     {activeTab === "reviews" && (
                        <div className="reviews-tab shadow-s3 p-8 rounded-md">
                           <Title level={5} className="font-normal">
                              Reviews
                           </Title>
                        </div>
                     )}
                  </div>
               </div>
            </Container>
         </section>
      </>
   );
};
export const AuctionHistory = ({ history }) => {
   return (
      <>
         <div className="shadow-s1 p-8 rounded-lg">
            <Title level={5} className="font-normal">
               Auction History
            </Title>
            <hr className="my-5" />

            {history?.length === 0 ? (
               <h2 className="m-2">No bidding Record Found!</h2>
            ) : (
               <div className="relative overflow-x-auto rounded-lg">
                  <table className="w-full text-sm text-left rt1:text-right text-gray-500">
                     <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                        <tr>
                           <th scope="col" className="px-6 py-5">
                              Date
                           </th>
                           <th scope="col" className="px-6 py-5">
                              Bid Amount(USD)
                           </th>
                           <th scope="col" className="px-6 py-5">
                              User
                           </th>
                           <th scope="col" className="px-6 py-5">
                              User
                           </th>
                        </tr>
                     </thead>
                     <tbody>
                        {history.map((item, index) => {
                           <tr key={index} className="bg-white border-b hover:bg-gray-50">
                              <td className="px-6 py-4">
                                 <DateFormatter date={item?.createdAt} />
                              </td>
                              <td className="px-6 py-4">{item?.price}</td>
                              <td className="px-6 py-4">{item?.user?.name}</td>
                              <td className="px-6 py-4"></td>
                           </tr>
                        })}
                     </tbody>
                  </table>
               </div>
            )}
         </div>
      </>
   )
}