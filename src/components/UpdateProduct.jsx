import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const UpdateProduct = () => {
  const { id } = useParams();
  const [updateProduct, setUpdateProduct] = useState({
    id: id,
    name: "",
    description: "",
    brand: "",
    price: "",
    category: "",
    releaseDate: "",
    productAvailable: false,
    stockQuantity: "",
  });
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/product/${id}`);
        const productData = response.data;

        // Set state including ID
        setUpdateProduct({
          id: productData.id,
          name: productData.name || "",
          description: productData.description || "",
          brand: productData.brand || "",
          price: productData.price || "",
          category: productData.category || "",
          releaseDate: productData.releaseDate || "",
          productAvailable: productData.productAvailable || false,
          stockQuantity: productData.stockQuantity || "",
        });

        // Fetch image if available
        if (productData.imageName) {
          const resImage = await axios.get(
            `http://localhost:8080/api/product/${id}/image`,
            { responseType: "blob" }
          );
          const imgFile = new File([resImage.data], productData.imageName, {
            type: resImage.data.type,
          });
          setImage(imgFile);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateProduct({ ...updateProduct, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    setUpdateProduct({ ...updateProduct, productAvailable: e.target.checked });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (image) formData.append("imageFile", image);

    // Append the product object including the ID
    formData.append(
      "product",
      new Blob([JSON.stringify(updateProduct)], { type: "application/json" })
    );

    try {
      await axios.put(`http://localhost:8080/api/product/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Product updated successfully!");
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product. Please try again.");
    }
  };

  return (
    <div className="update-product-container">
      <div className="center-container" style={{ marginTop: "7rem" }}>
        <h1>Update Product</h1>
        <form className="row g-3 pt-1" onSubmit={handleSubmit}>
          {/* Name */}
          <div className="col-md-6">
            <label className="form-label"><h6>Name</h6></label>
            <input
              type="text"
              className="form-control"
              value={updateProduct.name}
              onChange={handleChange}
              name="name"
            />
          </div>

          {/* Brand */}
          <div className="col-md-6">
            <label className="form-label"><h6>Brand</h6></label>
            <input
              type="text"
              className="form-control"
              value={updateProduct.brand}
              onChange={handleChange}
              name="brand"
            />
          </div>

          {/* Description */}
          <div className="col-12">
            <label className="form-label"><h6>Description</h6></label>
            <input
              type="text"
              className="form-control"
              value={updateProduct.description}
              onChange={handleChange}
              name="description"
            />
          </div>

          {/* Price */}
          <div className="col-5">
            <label className="form-label"><h6>Price</h6></label>
            <input
              type="number"
              className="form-control"
              value={updateProduct.price}
              onChange={handleChange}
              name="price"
            />
          </div>

          {/* Category */}
          <div className="col-md-6">
            <label className="form-label"><h6>Category</h6></label>
            <select
              className="form-select"
              value={updateProduct.category}
              onChange={handleChange}
              name="category"
            >
              <option value="">Select category</option>
              <option value="laptop">Laptop</option>
              <option value="headphone">Headphone</option>
              <option value="mobile">Mobile</option>
              <option value="electronics">Electronics</option>
              <option value="toys">Toys</option>
              <option value="fashion">Fashion</option>
            </select>
          </div>

          {/* Stock Quantity */}
          <div className="col-md-4">
            <label className="form-label"><h6>Stock Quantity</h6></label>
            <input
              type="number"
              className="form-control"
              value={updateProduct.stockQuantity}
              onChange={handleChange}
              name="stockQuantity"
            />
          </div>

          {/* Image */}
          <div className="col-md-8">
            <label className="form-label"><h6>Image</h6></label>
            <img
              src={image ? URL.createObjectURL(image) : "Image unavailable"}
              alt={updateProduct.name}
              style={{ width: "100%", height: "180px", objectFit: "cover", padding: "5px" }}
            />
            <input
              type="file"
              className="form-control"
              onChange={handleImageChange}
            />
          </div>

          {/* Product Available */}
          <div className="col-12">
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                checked={updateProduct.productAvailable}
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label">Product Available</label>
            </div>
          </div>

          {/* Submit */}
          <div className="col-12">
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
