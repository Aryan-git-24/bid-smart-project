import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { getAllCategory } from "../../redux/features/categorySlice";
import { useEffect } from "react";
import { Loader } from "./Loader";

export const CategoryDropDown = (props) => {
    const dispatch = useDispatch();
    const { categorys } = useSelector((state) => state.category);

    useEffect(() => {
        dispatch(getAllCategory());
    }, [dispatch]);

    const allCategory = categorys?.map((category) => {
        return {
            label: category?.title,
            value: category?._id,
        };
    });

    const handlechange = (selectedOption) => {
        props.onchange(selectedOption);
    }
    return (
        <>
            {Loader ? <Loader /> : <select id="category" onchange={handlechange} options={allCategory} value={props.value} />}
        </>
    )
}