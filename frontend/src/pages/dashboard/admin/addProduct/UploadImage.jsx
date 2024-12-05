import { useState } from "react";
import axios from "axios";
import { getBaseUrl } from "../../../../utils/baseUrl";

const UploadImage = ({ name, setImage }) => {
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");

  // base64 functionality
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => resolve(fileReader.result);
      fileReader.onerror = (error) => {
        console.error("Error converting file to base64:", error);
        reject(error);
      };
    });
  };

  // request to upload a file
  const UploadSingleImage = (base64) => {
    console.log("Uploading image...");
    console.log("Base64 string (first 100 chars):", base64.slice(0, 100)); // Avoid logging the full base64 string to reduce clutter

    setLoading(true);
    axios
      .post(`${getBaseUrl()}uploadImage`, { image: base64 })
      .then((res) => {
        console.log("Image upload response:", res.data);
        const imageUrl = res.data;
        setUrl(imageUrl);
        alert("Image uploaded successfully!");
        setImage(imageUrl);
      })
      .catch((error) => {
        console.error(
          "Error uploading image:",
          error.response || error.message
        );
      })
      .finally(() => {
        setLoading(false);
        console.log("Upload process finished");
      });
  };

  const uploadImage = async (event) => {
    const files = event.target.files;
    console.log("Files selected for upload:", files);

    if (files.length === 1) {
      console.log("Processing single file...");
      const base64 = await convertBase64(files[0]);
      console.log("Base64 conversion complete");
      UploadSingleImage(base64);
      return;
    }

    console.log("Processing multiple files...");
    const base64s = [];
    for (let i = 0; i < files.length; i++) {
      const base = await convertBase64[files[i]];
      base64s.push(base);
    }
    console.log("All files converted to base64");
  };

  return (
    <div>
      <label htmlFor={name}>Upload Image</label>
      <input
        type="file"
        name={name}
        id={name}
        onChange={uploadImage}
        className="add-product-InputCSS"
      />
      {loading && (
        <div className="mt-2 text-sm text-blue-600">Product uploading...</div>
      )}
      {url && (
        <div className="mt-2 text-sm text-green-600">
          <p>Image upload successfully!</p>
          <img src={url} alt="uploaded-image" />
        </div>
      )}
    </div>
  );
};

export default UploadImage;
