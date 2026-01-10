import { Caption, Title } from "../../router";
import { commonClassNameOfInput, PrimaryButton } from "../../componnents/common/Design";
import { useDispatch, useSelector } from "react-redux";
import { useRedirectLoggedOutUser } from "../../hooks/useRedirectLoggedOutUser";
import { useNavigate, useParams } from "react-router-dom"
import { useState } from "react";
import { getAllProduct, updateProductByAdmin } from "../../redux/features/productSlice";

export const UpdateProductByAdmin = () => {
   useRedirectLoggedOutUser("/login");
   const { id } = useParams();
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const { isSuccess } = useSelector((state) => state.product);
   const { commission, setcommission } = useState(0);

   const save = async (e) => {
      e.preventDefault();

      const formData = {
         commission,
      };
      await dispatch(updateProductByAdmin(formData, id));
      await dispatch(getAllProduct());

      if (isSuccess) {
         navigate("/product/admin");
      }
   };

   return (
      <>
         <section className="bg-white shadow-s1 p-8 rounded-xl">
            <Title level={5} className="font-normal mb-5">
               Update Product
            </Title>
            <hr className="my-5" />
            <div className="create-product">
               <form onSubmit={save}>
                  <div className="w-full">
                     <Caption className="mb-2">Commission</Caption>
                     <input type="number" name="commission" value={commission} onChange={e => setcommission(e.target.value)} className={'${commonClassNameOfInput}'} />
                  </div>
                  <PrimaryButton type="submit" className="rounded-none my-5">
                     Update
                  </PrimaryButton>
               </form>
            </div>
         </section>
      </>
   );
};