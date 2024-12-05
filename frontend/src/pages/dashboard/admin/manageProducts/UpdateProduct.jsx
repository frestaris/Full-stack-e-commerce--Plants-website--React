import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import TextInput from "../addProduct/TextInput";
import SelectInput from "../addProduct/SelectInput";
import UploadImage from "../addProduct/UploadImage";
import {
  useFetchProductByIdQuery,
  useUpdateProductMutation,
} from "../../../../redux/features/products/productApi";

import { useParams } from "react-router-dom";

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

const UpdateProduct = () => {
  const { user } = useSelector((state) => state.auth);
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    image: "",
  });
  const {
    data: productData,
    isLoading: isProductLoading,
    error: fetchError,
    refetch,
  } = useFetchProductByIdQuery(id);
  const {
    name,
    category,
    description,
    image: imageURL,
    price,
  } = productData?.product || {};

  const [newImage, setNewImage] = useState(null);

  const [updateProduct, { isLoading, error: updateError }] =
    useUpdateProductMutation();

  useEffect(() => {
    if (productData) {
      setProduct({
        name: name || "",
        category: category || "",
        price: price || "",
        description: description || "",
        image: imageURL || "",
      });
    }
  }, [productData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (image) => {
    setNewImage(image);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedProduct = {
      ...product,
      image: newImage ? newImage : product.image,
      author: user?._id,
    };
    try {
      await updateProduct({ id: id, ...updatedProduct }).unwrap();
      alert("Product updated successfully");
      await refetch();
      navigate("/dashboard/admin/manage-products");
    } catch (error) {
      console.error("Failed to update product"), error;
    }
  };

  if (isProductLoading) return <div>Loading...</div>;
  if (fetchError) return <div>Error fetching product!...</div>;

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-6">Update Product</h2>
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
          value={newImage || product.image}
          placeholder="Upload image"
          setImage={handleImageChange}
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
          <button
            type="submit"
            className="bg-green-800 rounded text-white p-2"
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Update product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;
