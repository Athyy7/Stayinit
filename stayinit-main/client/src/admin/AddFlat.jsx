import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import addFlat from "../BackendUtils/addFlat";

export default function AddFlatForm() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [flatData, setFlatData] = useState({
    uniqueName: "",
    name: "",
    developer: "",
    price: "",
    sqft: "",
    bhk: "",
    furnitureType: "",
    bathrooms: "",
    totalFloors: "",
    atWhichFloor: "",
    address: "",
    locality: "",
    city: "",
    pincode: "",
    addressLink: "",
    contactNumber: "",
    contactEmail: "",
    description: "",
    isFeatured: false,
    images: [],
  });

  useEffect(() => {
    const savedData = localStorage.getItem("flatFormData");
    if (savedData) {
      setFlatData(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("flatFormData", JSON.stringify(flatData));
  }, [flatData]);

  function handleInputChange(event) {
    const { name, value, type, checked } = event.target;
    setFlatData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleImageUpload(event) {
    const files = Array.from(event.target.files);
    setFlatData((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      const result = await addFlat(flatData, token);

      if (result.success) {
        // Clear form data and show success message
        localStorage.removeItem("flatFormData");
        // Navigate or show success message
        navigate("/dashboard");
      } else {
        setError(result.error);
      }
    } finally {
      setLoading(false);
    }
  }

  function renderStepContent() {
    switch (step) {
      case 1:
        return (
          <>
            <input
              name="uniqueName"
              type="text"
              placeholder="Unique Name"
              value={flatData.uniqueName}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm"
              required
            />
            <input
              name="name"
              type="text"
              placeholder="Flat Name"
              value={flatData.name}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm"
              required
            />
            <input
              name="developer"
              type="text"
              placeholder="Developer"
              value={flatData.developer}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm"
              required
            />
            <input
              name="price"
              type="number"
              placeholder="Price"
              value={flatData.price}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm"
              required
            />
          </>
        );
      case 2:
        return (
          <>
            <input
              name="sqft"
              type="number"
              placeholder="Square Feet"
              value={flatData.sqft}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm"
              required
            />
            <input
              name="bhk"
              type="number"
              placeholder="BHK"
              value={flatData.bhk}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm"
              required
            />
            <select
              name="furnitureType"
              value={flatData.furnitureType}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm"
              required
            >
              <option value="">Select Furniture Type</option>
              <option value="furnished">Furnished</option>
              <option value="unfurnished">Unfurnished</option>
              <option value="semifurnished">Semi-furnished</option>
            </select>
            <input
              name="bathrooms"
              type="number"
              placeholder="Number of Bathrooms"
              value={flatData.bathrooms}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm"
              required
            />
            <input
              name="totalFloors"
              type="number"
              placeholder="Total Floors"
              value={flatData.totalFloors}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm"
              required
            />
            <input
              name="atWhichFloor"
              type="number"
              placeholder="At Which Floor"
              value={flatData.atWhichFloor}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm"
              required
            />
          </>
        );
      case 3:
        return (
          <>
            <input
              name="address"
              type="text"
              placeholder="Address"
              value={flatData.address}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm"
              required
            />
            <input
              name="locality"
              type="text"
              placeholder="Locality"
              value={flatData.locality}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm"
              required
            />
            <input
              name="city"
              type="text"
              placeholder="City"
              value={flatData.city}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm"
              required
            />
            <input
              name="pincode"
              type="text"
              placeholder="Pincode"
              value={flatData.pincode}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm"
              required
            />
            <input
              name="addressLink"
              type="text"
              placeholder="Address Link"
              value={flatData.addressLink}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm"
              required
            />
            <input
              name="contactNumber"
              type="tel"
              placeholder="Contact Number"
              value={flatData.contactNumber}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm"
              required
            />
            <input
              name="contactEmail"
              type="email"
              placeholder="Contact Email"
              value={flatData.contactEmail}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm"
              required
            />
          </>
        );
      case 4:
        return (
          <>
            <textarea
              name="description"
              placeholder="Description"
              value={flatData.description}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm"
              rows="4"
            />
            <div className="flex items-center mt-2">
              <input
                name="isFeatured"
                type="checkbox"
                checked={flatData.isFeatured}
                onChange={handleInputChange}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                htmlFor="isFeatured"
                className="ml-2 block text-sm text-gray-900"
              >
                Featured Flat
              </label>
            </div>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm"
            />
            <div className="mt-2 text-sm text-gray-600">
              {flatData.images.length} image(s) selected
            </div>
          </>
        );
      default:
        return null;
    }
  }

  return (
    <div className="flex bg-white">
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-1 text-gray-900 mb-6">Add New Flat</h2>
          <p className="text-sm text-gray-600 mb-8">Step {step} of 4</p>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
            {error && <p className="text-red-600 text-sm">{error}</p>}

            {renderStepContent()}

            <div className="flex gap-4 justify-between">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="py-2 px-4 border border-transparent rounded-md text-sm font-medium text-indigo-600 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                >
                  Previous
                </button>
              )}
              {step < 4 ? (
                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  className="py-2 px-4 border border-transparent rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                >
                  Next
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
      <div className="hidden lg:block relative w-0 flex-1">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1908&q=80"
          alt="Apartment interior"
        />
      </div>
    </div>
  );
}