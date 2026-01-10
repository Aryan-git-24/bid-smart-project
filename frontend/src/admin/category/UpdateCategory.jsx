import { PrimaryButton } from "../../router";
import { Caption, commonClassNameOfInput, Title } from "../../componnents/common/Design";
import { useRedirectLoggedOutUser } from "../../hooks/useRedirectLoggedOutUser";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { getAllCategory } from "../../redux/features/categorySlice";

export const UpdateCategory = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { title, setTitle } = useState("");
  const { isSuccess } = useSelector((state) => state.category);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      title: title,
    };

    await dispatch(UpdateCategory({ formData, id }));
    await dispatch(getAllCategory());
    if (isSuccess) {
      navigate("/category");
    }
    navigate("/category");
  }
  return (
    <>
      <section className="bg-white shadow-s1 p-8 rounded-xl">
        <Title level={5} className="font-normal mb-5">
          Update Category
        </Title>
        <form onSubmit={handleSubmit}>
          <div className="w-full my-8">
            <caption className="mb-2">Title</caption>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} name="title" className={'${commonClassNameOfInput}'} />
          </div>
          <PrimaryButton type="submit" className="rounded-none my-5">
            Update
          </PrimaryButton>
        </form>
      </section>
    </>
  );
};