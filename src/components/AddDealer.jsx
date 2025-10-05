import React, { useState } from "react";
import axios from "axios";

const AddDealer = () => {
  const [dealer, setDealer] = useState({
    dealerName: "",
    ownerName: "",
    emailAddress: "",
    phoneNo: "",
    alternatePhoneNo: "",
    associatedProdCategory: "",
    businessLicenseNo: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDealer({ ...dealer, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/api/dealer",
        dealer,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      alert("Dealer registered successfully!");
      console.log(response.data);
    } catch (error) {
      alert("Error registering dealer");
      console.error(error);
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card shadow p-4" style={{ maxWidth: "700px", width: "100%" }}>
        <h3 className="mb-4 text-center">Dealer Registration</h3>
        <form onSubmit={submitHandler}>
          <div className="row g-3">
            {/* Dealer & Owner */}
            <div className="col-md-6">
              <label className="form-label">Dealer Name</label>
              <input
                type="text"
                className="form-control"
                name="dealerName"
                value={dealer.dealerName}
                onChange={handleInputChange}
                placeholder="Enter Dealer Name"
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Owner Name</label>
              <input
                type="text"
                className="form-control"
                name="ownerName"
                value={dealer.ownerName}
                onChange={handleInputChange}
                placeholder="Enter Owner Name"
                required
              />
            </div>

            {/* Email & Phones */}
            <div className="col-md-6">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-control"
                name="emailAddress"
                value={dealer.emailAddress}
                onChange={handleInputChange}
                placeholder="Enter Email"
                required
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">Phone No</label>
              <input
                type="text"
                className="form-control"
                name="phoneNo"
                value={dealer.phoneNo}
                onChange={handleInputChange}
                placeholder="Primary Phone"
                required
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">Alternate Phone</label>
              <input
                type="text"
                className="form-control"
                name="alternatePhoneNo"
                value={dealer.alternatePhoneNo}
                onChange={handleInputChange}
                placeholder="Optional Phone"
              />
            </div>

            {/* Business Type & License */}
            <div className="col-md-6">
              <label className="form-label">Product Category</label>
              <input
                type="text"
                className="form-control"
                name="associatedProdCategory"
                value={dealer.associatedProdCategory}
                onChange={handleInputChange}
                placeholder="Product Category Available for"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Business License No</label>
              <input
                type="text"
                className="form-control"
                name="businessLicenseNo"
                value={dealer.businessLicenseNo}
                onChange={handleInputChange}
                placeholder="Business License No"
              />
            </div>

            {/* Address */}
            <div className="col-12">
              <label className="form-label">Address</label>
              <input
                type="text"
                className="form-control"
                name="address"
                value={dealer.address}
                onChange={handleInputChange}
                placeholder="Street Address"
              />
            </div>

            {/* City / State / Pincode */}
            <div className="col-md-4">
              <label className="form-label">City</label>
              <input
                type="text"
                className="form-control"
                name="city"
                value={dealer.city}
                onChange={handleInputChange}
                placeholder="City"
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">State</label>
              <input
                type="text"
                className="form-control"
                name="state"
                value={dealer.state}
                onChange={handleInputChange}
                placeholder="State"
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Pincode</label>
              <input
                type="text"
                className="form-control"
                name="pincode"
                value={dealer.pincode}
                onChange={handleInputChange}
                placeholder="Pincode"
              />
            </div>

            {/* Country */}
            <div className="col-md-6">
              <label className="form-label">Country</label>
              <input
                type="text"
                className="form-control"
                name="country"
                value={dealer.country}
                onChange={handleInputChange}
                placeholder="Country"
              />
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
                Register Dealer
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDealer;
