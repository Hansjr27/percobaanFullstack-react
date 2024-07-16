import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { getProductById, updateProduct } from "../services/ProductService";

const EditProduct = () => {
  const [name, setName] = useState("");
  const [qty, setQty] = useState("");
  const [Price, setPrice] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const editProduct = async (e) => {
    e.preventDefault();
    const product = { name, qty, Price };
    try {
      const data = await updateProduct(id, product);
      if (data) {
        Swal.fire({
          title: "Success!",
          text: "Product has been updated",
          icon: "success",
        });
        navigate("/");
      }
    } catch (error) {
      let errorMessage = "An error occurred";
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      Swal.fire({
        title: "Error",
        text: errorMessage,
        icon: "error",
      });
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        if (data) {
          setName(data.name || "");
          setQty(data.qty || "");
          setPrice(data.Price || "");
        }
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "Failed to fetch product data",
          icon: "error",
        });
      }
    };
    fetchProduct();
  }, [id]);

  return (
    <div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow-lg shadow-slate-300">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        Edit Product
      </h2>
      <form onSubmit={editProduct} className="my-10">
        <div className="flex flex-col space-y-5">
          <div className="mb-5">
            <label className="font-bold text-slate-800">Product Name</label>
            <input
              type="text"
              name="productName"
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
              value={qty}
              onChange={(e) => setQty(e.target.value)}
              className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:shadow"
            />
          </div>
          <div className="mb-5">
            <label className="font-bold text-slate-800">Price</label>
            <input
              type="number"
              name="price"
              value={Price}
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

export default EditProduct;
