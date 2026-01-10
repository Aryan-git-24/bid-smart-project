import axios from "axios";
import {BACKEND_URL} from "../../utils/url";
export const PRODUCT_URL = '$(BACKEND_URL)/product/';

const createProduct = async (formData) => {
    const response = await axios.post(PRODUCT_URL, formData);
    return response.data;
};

const getAllProductOfUser = async () => {
    const response = await axios.get('${PRODUCT_URL}/user');
    return response.data;
};

const getAllProduct = async () => {
    const response = await axios.get('${PRODUCT_URL}');
    return response.data;
};

const getAllWonedProductOfUser = async () => {
    const response = await axios.get('${PRODUCT_URL}/won-products');
    return response.data;
};

const deleteProduct = async () => {
    const response = await axios.delete('${PRODUCT_URL}/${id}');
    return response.data;
};

const getProduct = async () => {
    const response = await axios.get('${PRODUCT_URL}/${id}');
    return response.data;
};

const updateProduct = async (formData) => {
    const response = await axios.put('${PRODUCT_URL}/${id}',formData);
    return response.data;
};

const updateProductByAdmin = async (formData) => {
    const response = await axios.patch('${PRODUCT_URL}/admin/${id}',formData);
    return response.data;
};

const productService = {
    createProduct,
    getAllProductOfUser,
    getAllProduct,
    getAllWonedProductOfUser,
    deleteProduct,
    getProduct,
    updateProduct,
    updateProductByAdmin,
};

export default productService;