import { useState } from "react";
import { useSelector } from "react-redux";
import TextInput from "./TextInput";
import SelectInput from "./SelectInput";
import UploadImage from "./UploadImage";

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = () => {};
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
      </form>
    </div>
  );
};

export default AddProduct;
