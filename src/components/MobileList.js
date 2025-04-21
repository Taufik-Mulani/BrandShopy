import React from 'react';

const MobileList = ({ mobiles, handleEdit, handleDelete, isDarkMode }) => {
  return (
    <div className="mt-4">
      <h4 className="text-center mb-3">Mobile List</h4>
      <table className={`table ${isDarkMode ? 'table-dark table-bordered' : 'table-bordered'}`}>
        <thead>
          <tr>
            <th>Model</th>
            <th>Brand</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {mobiles.map((mobile) => (
            <tr key={mobile.mobileId}>
              <td>{mobile.model}</td>
              <td>{mobile.brand}</td>
              <td>{mobile.price}</td>
              <td>{mobile.quantity}</td>
              <td>{mobile.date ? new Date(mobile.date).toLocaleDateString() : ''}</td>
              <td>
                <button
                  className="btn btn-sm btn-primary me-2"
                  onClick={() => handleEdit(mobile)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(mobile.mobileId)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MobileList;
