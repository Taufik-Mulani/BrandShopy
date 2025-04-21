import React from 'react';

const MobileForm = ({ formData, handleChange, handleAdd, isEditing, isDarkMode }) => {
  return (
    <>
    
    <div className={`card p-4 shadow-sm ${isDarkMode ? 'bg-secondary text-white' : ''}`}>
      <h4 className="text-center mb-4">{isEditing ? 'Update Mobile' : 'Add Mobile'}</h4>
      <form>
        <div className="row g-3">
          <div className="col-md-6">
            <input
              type="text"
              name="model"
              className="form-control"
              placeholder="Model"
              value={formData.model}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              name="brand"
              className="form-control"
              placeholder="Brand"
              value={formData.brand}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <input
              type="number"
              name="price"
              className="form-control"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <input
              type="number"
              name="quantity"
              className="form-control"
              placeholder="Quantity"
              value={formData.quantity}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <input
              type="date"
              name="date"
              className="form-control"
              value={formData.date}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <button
            type="button"
            className="btn btn-primary mt-4"
            onClick={handleAdd}
          >
            {isEditing ? 'Update Mobile' : 'Add Mobile'}
          </button>
        </div>
      </form>
    </div>
    </>
  );
};

export default MobileForm;
