import React, { useState } from "react";

const BillList = ({ bills, handleEdit, handleDelete, isDarkMode }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter logic
  const filteredBills = bills.filter((bill) => {
    const lowerSearch = searchTerm.toLowerCase();
    return (
      bill.billNo.toString().includes(lowerSearch) ||
      bill.name.toLowerCase().includes(lowerSearch) ||
      bill.mobileNumber.toLowerCase().includes(lowerSearch) ||
      bill.date.toLowerCase().includes(lowerSearch)
    );
  });

  return (
    <div className="mt-4 d-print-none">
      <h4 className="text-center mb-3">Saved Bills</h4>

      {/* Search Input */}
      <div className="mb-3 text-center">
        <input
          type="text"
          className="form-control w-50 mx-auto"
          placeholder="Search by Bill No, Name, Mobile No, or Date"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <table className={`table ${isDarkMode ? "table-dark table-bordered" : "table-bordered"}`}>
        <thead>
          <tr>
            <th>Bill No</th>
            <th>Name</th>
            <th>Mobile No</th>
            <th>Date</th>
            <th>IMEI Number</th>
            <th>Model</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredBills.length > 0 ? (
            filteredBills.map((bill) => (
              <tr key={bill.billId}>
                <td>{bill.billNo}</td>
                <td>{bill.name}</td>
                <td>{bill.mobileNumber}</td>
                <td>{new Date(bill.date).toLocaleDateString()}</td>
                <td>{bill.imeiNumber}</td>
                <td>{bill.model}</td>
                <td>{bill.quantity}</td>
                <td>{bill.total}</td>
                <td>
                  <button className="btn btn-sm btn-primary me-2" onClick={() => handleEdit(bill)}>Edit</button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(bill.billId)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="text-center">No bills found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BillList;
