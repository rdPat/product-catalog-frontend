import React, { useState } from "react";
import axios from "axios";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    brand: "",
    description: "",
    price: "",
    category: "",
    stockQuantity: "",
    releaseDate: "",
    productAvailable: false,
  });
  const [image, setImage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => setImage(e.target.files[0]);

  const submitHandler = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("imageFile", image);
    formData.append(
      "product",
      new Blob([JSON.stringify(product)], { type: "application/json" })
    );

    axios
      .post("http://localhost:8080/api/product", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        console.log("Product added successfully:", response.data);
        alert("Product added successfully");
      })
      .catch((error) => {
        console.error("Error adding product:", error);
        alert("Error adding product");
      });
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card shadow p-4" style={{ maxWidth: "700px", width: "100%" }}>
        <h3 className="mb-4 text-center">Add Product</h3>
        <form className="row g-3" onSubmit={submitHandler}>
          {/* Name & Brand */}
          <div className="col-md-6">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Product Name"
              name="name"
              value={product.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Brand</label>
            <input
              type="text"
              className="form-control"
              placeholder="Brand"
              name="brand"
              value={product.brand}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Description */}
          <div className="col-12">
            <label className="form-label">Description</label>
            <input
              type="text"
              className="form-control"
              placeholder="Product Description"
              name="description"
              value={product.description}
              onChange={handleInputChange}
            />
          </div>

          {/* Price, Category */}
          <div className="col-md-4">
            <label className="form-label">Price</label>
            <input
              type="number"
              className="form-control"
              placeholder="Eg: $1000"
              name="price"
              value={product.price}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Stock Quantity</label>
            <input
              type="number"
              className="form-control"
              placeholder="Stock Remaining"
              name="stockQuantity"
              value={product.stockQuantity}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Release Date</label>
            <input
              type="date"
              className="form-control"
              name="releaseDate"
              value={product.releaseDate}
              onChange={handleInputChange}
            />
          </div>

          {/* Category */}
          <div className="col-md-6">
            <label className="form-label">Category</label>
            <select
              className="form-select"
              name="category"
              value={product.category}
              onChange={handleInputChange}
            >
              <option value="">Select category</option>
              <option value="Laptop">Laptop</option>
              <option value="Headphone">Headphone</option>
              <option value="Mobile">Mobile</option>
              <option value="Electronics">Electronics</option>
              <option value="Toys">Toys</option>
              <option value="Fashion">Fashion</option>
            </select>
          </div>

          {/* Image Upload */}
          <div className="col-md-6">
            <label className="form-label">Product Image</label>
            <input
              type="file"
              className="form-control"
              onChange={handleImageChange}
              title="Upload Product Image"
            />
          </div>

          {/* Available Checkbox */}
          <div className="col-12 form-check mt-2">
            <input
              type="checkbox"
              className="form-check-input"
              id="productAvailable"
              checked={product.productAvailable}
              onChange={(e) =>
                setProduct({ ...product, productAvailable: e.target.checked })
              }
            />
            <label className="form-check-label" htmlFor="productAvailable">
              Product Available
            </label>
          </div>

          {/* Submit Button */}
          <div className="col-12 mt-3 d-flex justify-content-center">
            <button
              type="submit"
              className="btn btn-light"
              style={{
                backgroundColor: "#d3d3d3",
                borderColor: "#d3d3d3",
                color: "black",
                width: "200px",
              }}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
