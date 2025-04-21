import React, { useRef } from "react";

const BillForm = ({ formData, handleChange, handleSubmitBill, isDarkMode }) => {
  const billRef = useRef(); // Reference for printing

  const handlePrint = () => {
    window.print(); // Print the bill
  };

  return (
    <div
      ref={billRef}
      className={`card p-4 shadow-sm ${isDarkMode ? "bg-secondary text-white" : ""}`}
    >
      <h2 className="text-center mb-4">🧾 Brand Invoice</h2>

      {/* Bill Details Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmitBill();
        }}
      >
        <div className="row g-3">
          {/* Name */}
          <div className="col-md-6">
            <label className="form-label fw-semibold">Name</label>
            <input
              type="text"
              name="name"
              className="form-control d-print-none"
              placeholder="Customer Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <p className="d-none d-print-block mb-0">{formData.name}</p>
          </div>

          {/* Mobile No */}
          <div className="col-md-6">
            <label className="form-label fw-semibold">Mobile No.</label>
            <input
              type="tel"
              name="mobileNumber"
              className="form-control d-print-none"
              placeholder="Mobile Number"
              value={formData.mobileNumber}
              onChange={handleChange}
              required
            />
            <p className="d-none d-print-block mb-0">{formData.mobileNumber}</p>
          </div>

          {/* Date */}
          <div className="col-md-6">
            <label className="form-label fw-semibold">Date</label>
            <input
              type="date"
              name="date"
              className="form-control d-print-none"
              value={formData.date}
              onChange={handleChange}
              required
            />
            <p className="d-none d-print-block mb-0">{formData.date}</p>
          </div>

          {/* IMEI Number */}
          <div className="col-md-6">
            <label className="form-label fw-semibold">IMEI Number</label>
            <input
              type="text"
              name="imeiNumber"
              className="form-control d-print-none"
              placeholder="IMEI Number"
              value={formData.imeiNumber}
              onChange={handleChange}
              required
            />
            <p className="d-none d-print-block mb-0">{formData.imeiNumber}</p>
          </div>
        </div>

        {/* Bill Table */}
        <table className="table mt-4">
          <thead>
            <tr>
              <th>Bill No</th>
              <th>Model</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{formData.billNo}</td>

              <td>
                <input
                  type="text"
                  name="model"
                  className="form-control d-print-none"
                  value={formData.model}
                  onChange={handleChange}
                />
                <p className="d-none d-print-block mb-0">{formData.model}</p>
              </td>

              <td>
                <input
                  type="number"
                  name="quantity"
                  className="form-control d-print-none"
                  value={formData.quantity}
                  onChange={handleChange}
                />
                <p className="d-none d-print-block mb-0">{formData.quantity}</p>
              </td>

              <td>
                <input
                  type="number"
                  name="total"
                  className="form-control d-print-none"
                  value={formData.total}
                  onChange={handleChange}
                />
                <p className="d-none d-print-block mb-0">₹{formData.total}</p>
              </td>
            </tr>
          </tbody>
        </table>

        {/* Signature */}
        <div className="text-center mt-4">
          <p className="fw-semibold">Authorized Signatory</p>
        </div>

        {/* Buttons (Hidden when printing) */}
        <div className="text-center mt-4 d-print-none">
          <button type="submit" className="btn btn-primary">
            Save Bill
          </button>
          <button
            type="button"
            className="btn btn-success ms-2"
            onClick={handlePrint}
          >
            Print Bill
          </button>
        </div>
      </form>
    </div>
  );
};

export default BillForm;
