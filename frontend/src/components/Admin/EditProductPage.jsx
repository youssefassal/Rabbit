import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchProductDetails,
  updateProduct,
} from "../../redux/slices/productsSlice";
import axios from "axios";

const EditProductPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { selectedProduct, loading, error } = useSelector(
    (state) => state.products
  );

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: 0,
    countInStock: 0,
    sku: "",
    sizes: [],
    colors: [],
    category: "",
    brand: "",
    collections: "",
    material: "",
    gender: "",
    images: [],
  });

  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductDetails(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedProduct) {
      setProductData(selectedProduct);
    }
  }, [selectedProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploading(true);
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/upload`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setProductData((prevData) => ({
        ...prevData,
        images: [...prevData.images, { url: data.imageUrl, altText: "" }],
      }));
      setUploading(false);
    } catch (error) {
      console.error("Error uploading image:", error);
      setUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProduct({ id, productData }));
    navigate("/admin/products");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 shadow-md rounded-md">
      <h2 className="text-3xl font-bold mb-6">Edit Product</h2>
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="mb-6">
          <label className="block font-semibold mb-2" htmlFor="name">
            Product Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={productData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            autoComplete="off"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="block font-semibold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            value={productData.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            rows={4}
            required
          />
        </div>

        {/* Price and Count in Stock and SKU */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Price */}
          <div className="mb-6">
            <label className="block font-semibold mb-2" htmlFor="price">
              Price
            </label>
            <input
              type="number"
              name="price"
              id="price"
              value={productData.price}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Count in Stock */}
          <div className="mb-6">
            <label className="block font-semibold mb-2" htmlFor="countInStock">
              Count in Stock
            </label>
            <input
              type="number"
              name="countInStock"
              id="countInStock"
              value={productData.countInStock}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* SKU */}
          <div className="mb-6">
            <label className="block font-semibold mb-2" htmlFor="sku">
              SKU
            </label>
            <input
              type="text"
              name="sku"
              id="sku"
              value={productData.sku}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        {/* Sizes and Colors and Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Sizes */}
          <div className="mb-6">
            <label className="block font-semibold mb-2" htmlFor="sizes">
              Sizes (comma-separated)
            </label>
            <input
              type="text"
              name="sizes"
              id="sizes"
              value={productData.sizes.join(", ")}
              onChange={(e) =>
                setProductData({
                  ...productData,
                  sizes: e.target.value.split(",").map((size) => size.trim()),
                })
              }
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Colors */}
          <div className="mb-6">
            <label className="block font-semibold mb-2" htmlFor="colors">
              Colors (comma-separated)
            </label>
            <input
              type="text"
              name="colors"
              id="colors"
              value={productData.colors.join(", ")}
              onChange={(e) =>
                setProductData({
                  ...productData,
                  colors: e.target.value
                    .split(",")
                    .map((color) => color.trim()),
                })
              }
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Category */}
          <div className="mb-6">
            <label className="block font-semibold mb-2" htmlFor="category">
              Category
            </label>
            <select
              name="category"
              id="category"
              value={productData.category}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" className="bg-gray-500 text-gray-100">
                Select Category
              </option>
              <option value="clothing" className="bg-gray-500 text-gray-100">
                Clothing
              </option>
              <option value="accessories" className="bg-gray-500 text-gray-100">
                Accessories
              </option>
              <option value="footwear" className="bg-gray-500 text-gray-100">
                Footwear
              </option>
            </select>
          </div>
        </div>

        {/* Brand, Collections, Material */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Brand */}
          <div className="mb-6">
            <label className="block font-semibold mb-2" htmlFor="brand">
              Brand
            </label>
            <select
              name="brand"
              id="brand"
              value={productData.brand}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" className="bg-gray-500 text-gray-100">
                Select Brand
              </option>
              <option value="brandA" className="bg-gray-500 text-gray-100">
                Brand A
              </option>
              <option value="brandB" className="bg-gray-500 text-gray-100">
                Brand B
              </option>
              <option value="brandC" className="bg-gray-500 text-gray-100">
                Brand C
              </option>
            </select>
          </div>

          {/* Collections */}
          <div className="mb-6">
            <label className="block font-semibold mb-2" htmlFor="collections">
              Collections
            </label>
            <select
              name="collections"
              id="collections"
              value={productData.collections}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" className="bg-gray-500 text-gray-100">
                Select Collections
              </option>
              <option value="collection1" className="bg-gray-500 text-gray-100">
                Collection 1
              </option>
              <option value="collection2" className="bg-gray-500 text-gray-100">
                Collection 2
              </option>
              <option value="collection3" className="bg-gray-500 text-gray-100">
                Collection 3
              </option>
            </select>
          </div>

          {/* Material */}
          <div className="mb-6">
            <label className="block font-semibold mb-2" htmlFor="material">
              Material
            </label>
            <select
              name="material"
              id="material"
              value={productData.material}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" className="bg-gray-500 text-gray-100">
                Select Material
              </option>
              <option value="material1" className="bg-gray-500 text-gray-100">
                Material 1
              </option>
              <option value="material2" className="bg-gray-500 text-gray-100">
                Material 2
              </option>
              <option value="material3" className="bg-gray-500 text-gray-100">
                Material 3
              </option>
            </select>
          </div>
        </div>

        {/* Image Upload and Gender */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Image Upload */}
          <div className="mb-6 md:order-0 order-1">
            <label className="block font-semibold mb-2" htmlFor="image">
              Upload Image
            </label>
            <input
              type="file"
              name="image"
              id="image"
              onChange={handleImageUpload}
              multiple
              className="w-full hover:cursor-pointer hover:bg-gray-100 border border-gray-300 rounded-md p-2"
            />
            {uploading && <p className="mt-2">Uploading...</p>}
            <div className="flex gap-4 mt-4">
              {productData.images.map((image, index) => (
                <div key={index}>
                  <img
                    src={image.url}
                    alt={image.altText || "Product Image"}
                    className="w-20 h-20 object-cover rounded-md shadow-md"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Gender */}
          <div className="mb-6">
            <label className="block font-semibold mb-2" htmlFor="gender">
              Gender
            </label>
            <select
              name="gender"
              id="gender"
              value={productData.gender}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" className="bg-gray-500 text-gray-100">
                Select Gender
              </option>
              <option value="male" className="bg-gray-500 text-gray-100">
                Male
              </option>
              <option value="female" className="bg-gray-500 text-gray-100">
                Female
              </option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-white hover:text-green-500 hover:border-green-500 border border-green-500 cursor-pointer transition-colors duration-300"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProductPage;
