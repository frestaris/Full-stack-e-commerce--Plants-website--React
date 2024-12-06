import { useSelector, useDispatch } from "react-redux";
import { useEditProfileMutation } from "../../../../redux/features/auth/authApi";
import { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { RiCloseFill } from "react-icons/ri";
import { setUser } from "../../../../redux/features/auth/authSlice";
import { toast } from "react-toastify";

const UserProfile = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [editProfile, { isLoading }] = useEditProfileMutation();

  const [formData, setFormData] = useState({
    username: user?.username || "",
    profileImage: user?.profileImage || "",
    bio: user?.bio || "",
    profession: user?.profession || "",
    userId: user?._id || "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        username: user?.username || "",
        profileImage: user?.profileImage || "",
        bio: user?.bio || "",
        profession: user?.profession || "",
        userId: user?._id || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updateUser = { ...formData };

    try {
      console.log("Update Payload:", updateUser);
      const response = await editProfile(updateUser).unwrap();
      dispatch(setUser(response.user));
      localStorage.setItem("user", JSON.stringify(response.user));
      toast.success("Profile updated successfully!");
      setIsModalOpen(false);
    } catch (error) {
      console.error("API Error:", error);
      toast.error("Failed to update profile. Please try again!");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex items-center mb-4">
          <img
            src={
              formData?.profileImage ||
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            }
            alt="profile picture"
            className="w-32 h-32 object-cover rounded-full"
          />
          <div className="ml-6">
            <h3 className="text-2xl font-semibold">
              Username: {formData?.username || "N/A"}
            </h3>
            <p className="text-gray-700">User Bio: {formData.bio || "N/A"}</p>
            <p className="text-gray-700">
              Profession: {formData.profession || "N/A"}
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="ml-auto text-blue-500 hover:text-blue-700"
          >
            <FiEdit className="text-2xl" />
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg md:w-96 max-w-xl mx-auto relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-primary"
            >
              <RiCloseFill size={24} className="" />
            </button>
            <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData?.username}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Profile Image URL</label>
                <input
                  type="text"
                  name="profileImage"
                  value={formData?.profileImage}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Bio</label>
                <textarea
                  name="bio"
                  value={formData?.bio}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Profession</label>
                <input
                  type="text"
                  name="profession"
                  value={formData?.profession}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className={`mt-4 w-full bg-green-800 text-white py-2 px-2 rounded-md ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
