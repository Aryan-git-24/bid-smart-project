import { Caption, PrimaryButton, Title } from "../../router";
import { commonClassNameOfInput } from "../../componnents/common/Design";
import { useRedirectLoggedOutUser } from "../../hooks/useRedirectLoggedOutUser";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { getAllCategory } from "../../redux/features/categorySlice";

export const CreateCategory = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { title, setTitle } = useState("");
  const { error, steError } = useState("");

  const handleInputChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      steError("");
      await dispatch(CreateCategory({ title })).unwrap();
      await dispatch(getAllCategory()).unwrap();
      navigate("/category")
    } catch (error) {
      steError("Failed to create category. Please try again");
    }
  };

  return (
    <>
      <section className="bg-white shadow-s1 p-8 rounded-xl">
        <Title level={5} className="font-normal mb-5">
          Create Category
        </Title>
        <form onSubmit={handleSubmit}>
          <div className="w-full my-8">
            <caption className="mb-2">Title</caption>
            <input value={title} onChange={handleInputChange} type="text" className={'${commonClassNameOfInput}'} placeholder="Title" required />
          </div>
          <PrimaryButton type="submit" className="rounded-none my-5">
            CREATE
          </PrimaryButton>
        </form>
      </section>
    </>
  )
}