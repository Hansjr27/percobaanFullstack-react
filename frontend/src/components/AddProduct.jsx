import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { inputProduct } from "../services/ProductService";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [qty, setQty] = useState("");
  const [price, setPrice] = useState("");
  const navigate = useNavigate();
  const saveProduct = async (e) => {
    e.preventDefault();
    const product = { name, qty, price };
    try {
      const data = await inputProduct(product);
      if (data) {
        Swal.fire({
          title: "Success!",
          text: "Product has been added",
          icon: "success",
        });
        navigate("/");
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error,
        icon: "error",
      });
    }
  };

  return (
    <div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow-lg shadow-slate-300">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        Add Product
      </h2>
      <form onSubmit={saveProduct} className="my-10">
        <div className="flex flex-col space-y-5">
          <div className="mb-5">
            <label className="font-bold text-slate-800">Product Name</label>
            <input
              type="text"
              name="productName"
              placeholder="Enter product name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:shadow"
            />
          </div>
          <div className="mb-5">
            <label className="font-bold text-slate-800">QTY</label>
            <input
              type="number"
              name="quantity"
              placeholder="Enter quantity"
              value={qty}
              onChange={(e) => setQty(e.target.value)}
              className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:shadow"
            />
          </div>
          <div className="mb-5">
            <label className="font-bold text-slate-800">Price</label>
            <input
              type="text"
              name="price"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:shadow"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition duration-300"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
