import { useState } from "react";
import { useSelector } from "react-redux";
import TextInput from "./TextInput";
import SelectInput from "./SelectInput";
import UploadImage from "./UploadImage";
import { useAddProductMutation } from "../../../../redux/features/products/productApi";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";

const categories = [
  {
    label: "Select Category",
    value: "",
  },
  {
    label: "Indoor Plants",
    value: "indoor plants",
  },
  {
    label: "Outdoor Plants",
    value: "outdoor plants",
  },
  {
    label: "Succulents & Cacti",
    value: "succulents & cacti",
  },
  {
    label: "Plant Accessories",
    value: "plant accessories",
  },
];

const AddProduct = () => {
  const { user } = useSelector((state) => state.auth);
  const [product, setProduct] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
  });

  const [image, setImage] = useState("");

  const [AddProduct, { isLoading, error }] = useAddProductMutation();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !product.name ||
      !product.category ||
      !product.price ||
      !product.description
    ) {
      alert("Please fill all the required fields");
      return;
    }
    try {
      await AddProduct({ ...product, image, author: user?._id }).unwrap();
      toast.success("Product added successfully");
      setProduct({ name: "", category: "", price: "", description: "" });
      setImage("");
      navigate("/shop");
    } catch (error) {
      toast.error("Failed to add product!", error);
      console.log("Failed to submit product", error);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <TextInput
          label="Product Name"
          name="name"
          value={product.name}
          onChange={handleChange}
          type="text"
          placeholder="Product Name"
        />
        <SelectInput
          label="Category"
          name="category"
          value={product.category}
          onChange={handleChange}
          options={categories}
        />
        <TextInput
          label="Price"
          name="price"
          value={product.price}
          onChange={handleChange}
          type="number"
          placeholder="$"
        />
        <UploadImage
          name="Image"
          id="image"
          value={(e) => setImage(e.target.value)}
          placeholder="Upload image"
          setImage={setImage}
        />
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 "
          >
            Description
          </label>
          <textarea
            name="description"
            id="description"
            className="add-product-InputCSS"
            value={product.description}
            placeholder="Write a product description"
            onChange={handleChange}
          ></textarea>
        </div>
        <div>
          <button type="submit" className="bg-green-800 rounded text-white p-2">
            Add product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
