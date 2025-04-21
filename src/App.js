import React, { useState, useEffect } from "react";
import MobileForm from "./components/MobileForm";
import MobileList from "./components/MobileList";
import BillForm from "./components/BillForm";
import BillList from "./components/BillList";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const today = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    model: "",
    brand: "",
    price: "",
    quantity: "",
    date: today,
  });

  const [billData, setBillData] = useState({
    billId: null,
    name: "",
    mobileNumber: "",
    date: today,
    imeiNumber: "",
    model: "",
    quantity: "",
    total: "",
    billNo: Math.floor(Math.random() * 100000),
  });

  const [mobiles, setMobiles] = useState([]);
  const [bills, setBills] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showBill, setShowBill] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch Data
  useEffect(() => {
    fetchMobiles();
    fetchBills();
  }, []);

  const fetchMobiles = async () => {
    try {
      const res = await axios.get("https://localhost:5001/api/Mobiles");
      setMobiles(res.data);
    } catch (error) {
      console.error("Error fetching mobiles:", error);
    }
  };

  const fetchBills = async () => {
    try {
      const res = await axios.get("https://localhost:5001/api/Bills");
      setBills(res.data);
    } catch (error) {
      console.error("Error fetching bills:", error);
    }
  };

  // Handle Add/Edit Mobile
  const handleAdd = async () => {
    try {
      if (editingId) {
        await axios.put(`https://localhost:5001/api/Mobiles/${editingId}`, { mobileId: editingId, ...formData });
      } else {
        await axios.post("https://localhost:5001/api/Mobiles", formData);
      }
      fetchMobiles();
      resetMobileForm();
    } catch (error) {
      console.error("Error saving mobile:", error.response?.data || error.message);
    }
  };

  const handleEdit = (mobile) => {
    setFormData({
      model: mobile.model,
      brand: mobile.brand,
      price: mobile.price,
      quantity: mobile.quantity,
      date: mobile.date ? mobile.date.split("T")[0] : today,
    });
    setEditingId(mobile.mobileId);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://localhost:5001/api/Mobiles/${id}`);
      fetchMobiles();
    } catch (error) {
      console.error("Error deleting mobile:", error.response?.data || error.message);
    }
  };
  
  const handleSubmitBill = async () => {
    try {
      const cleanedBillData = {
        name: billData.name.trim(),
        mobileNumber: billData.mobileNumber.trim(),
        date: billData.date,
        imeiNumber: billData.imeiNumber.trim(),
        model: billData.model.trim(),
        quantity: Number(billData.quantity),
        total: Number(billData.total),
        billNo: billData.billNo,
      };
  
      let newBill;
      if (billData.billId) {
        // Editing an existing bill
        await axios.put(`https://localhost:5001/api/Bills/${billData.billId}`, { billId: billData.billId, ...cleanedBillData });
        setBills(prevBills => prevBills.map(b => b.billId === billData.billId ? { billId: billData.billId, ...cleanedBillData } : b));
      } else {
        // Adding a new bill (without billId)
        const res = await axios.post("https://localhost:5001/api/Bills", cleanedBillData);
        newBill = res.data;
        setBills(prevBills => [...prevBills, newBill]);
      }
  
      resetBillForm();
    } catch (error) {
      console.error("Error saving bill:", error.response?.data || error.message);
    }
  };
  
  const handleEditBill = (bill) => {
    setBillData({
      ...bill,
      billId: bill.billId, // Ensure billId is retained
      date: bill.date.split("T")[0],
      name: bill.name.toUpperCase(),
      model: bill.model.toUpperCase(),
    });
  };
  

  const handleDeleteBill = async (id) => {
    try {
      await axios.delete(`https://localhost:5001/api/Bills/${id}`);
      fetchBills();
    } catch (error) {
      console.error("Error deleting bill:", error.response?.data || error.message);
    }
  };

   // Handle Input Change for Mobile Form
   const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: ["model", "brand"].includes(name) ? value.toUpperCase() : value,
    }));
  };

  // Handle Input Change for Bill Form
  const handleBillChange = (e) => {
    const { name, value } = e.target;
    setBillData((prev) => ({
      ...prev,
      [name]: ["name", "model"].includes(name) ? value.toUpperCase() : value,
    }));
  };

  // Reset Forms
  const resetMobileForm = () => setFormData({ model: "", brand: "", price: "", quantity: "", date: today });
  const resetBillForm = () => setBillData({ billId: null, name: "", mobileNumber: "", date: today, imeiNumber: "", model: "", quantity: "", total: "", billNo: Math.floor(Math.random() * 100000) });

  return (
    <div className={isDarkMode ? "bg-dark text-white min-vh-100" : "bg-light text-dark min-vh-100"}>
      {/* Navigation Bar */}
      <nav className={`navbar navbar-expand-lg ${isDarkMode ? "navbar-dark bg-dark" : "navbar-light bg-light"} shadow`}>
        <div className="container-fluid px-4 d-print-none">
          <a className="navbar-brand fw-bold fs-4" href="/">👑 BRAND</a>
          <div className="d-flex align-items-center ms-auto gap-2">
            <button className="btn btn-outline-secondary" onClick={() => setIsDarkMode(!isDarkMode)}>
              {isDarkMode ? "Light Mode" : "Dark Mode"}
            </button>
            <a className="btn btn-primary" href="/" onClick={(e) => { e.preventDefault(); setShowForm(true); setShowBill(false); }}>Add Items</a>
            <a className="btn btn-warning ms-2" href="/" onClick={(e) => { e.preventDefault(); setShowForm(false); setShowBill(true); }}>Create Bill</a>
          </div>
        </div>
      </nav>

      {/* Search Bar (Visible when adding items) */}
      {showForm && (
        <div className="d-flex justify-content-center mt-4">
          <input type="text" className="form-control me-2" placeholder="Search by model or brand..." style={{ width: "400px" }} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
      )}

      {/* Content */}
      <div className="container py-4">
        {showForm && (
          <>
            <MobileForm formData={formData} handleChange={handleChange} handleAdd={handleAdd} isEditing={!!editingId} isDarkMode={isDarkMode} />
            <MobileList mobiles={mobiles.filter(m => m.model.toLowerCase().includes(searchTerm.toLowerCase()) || m.brand.toLowerCase().includes(searchTerm.toLowerCase()))} handleEdit={handleEdit} handleDelete={handleDelete} isDarkMode={isDarkMode} />
          </>
        )}

        {showBill && (
          <>
            <BillForm formData={billData} handleChange={handleBillChange} handleSubmitBill={handleSubmitBill} isDarkMode={isDarkMode} />
            <BillList bills={bills} handleEdit={handleEditBill} handleDelete={handleDeleteBill} isDarkMode={isDarkMode} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
