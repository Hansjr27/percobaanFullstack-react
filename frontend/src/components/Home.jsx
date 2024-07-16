import useSWR, { useSWRConfig } from "swr";
import { deleteProduct, getAllProduct } from "../services/ProductService";
import { Link } from "react-router-dom";
import "remixicon/fonts/remixicon.css";
import Swal from "sweetalert2";

const Home = () => {
  const { mutate } = useSWRConfig();
  const fatcher = async (url) => {
    return await getAllProduct(url);
  };
  const { data, error } = useSWR("/api/products", fatcher);
  let loading = false;
  if (!data) {
    loading = true;
  }
  const delProduct = async (id) => {
    Swal.fire({
      icon: "warning",
      title: "Confirmation",
      text: "Are you sure want to delete this product?",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteProduct(id);
        mutate("/api/products");
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        return false;
      }
    });
  };
  return (
    <div className="flex flex-col mt-5">
      <div className="w-full">
        <Link
          to={"/add"}
          className="bg-green-500 border border-slate-text hover:bg-green-700 text-white py-1 px-3 rounded-md"
        >
          <i className="ri-add-large-fill"></i> Add New
        </Link>
        <div className="relative shadow rounded-lg mt-3">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="tex-xs text-gray-700 uppercase bg-gray-100">
              <tr>
                <th className="py-3 px-1 text-center">No</th>
                <th className="py-3 px-1">Product Name</th>
                <th className="py-3 px-1 text-right">QTY</th>
                <th className="py-3 px-1 text-right">Price</th>
                <th className="py-3 px-1 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {data ? (
                data.map((product, index) => {
                  return (
                    <tr key={product.id} className="bg-white border-b">
                      <td className="py-3 px-1 text-center">{index + 1}</td>
                      <td className="py-3 px-1">{product.name}</td>
                      <td className="py-3 px-1 text-right">{product.qty}</td>
                      <td className="py-3 px-1 text-right">
                        Rp.{product.Price}
                      </td>
                      <td className="py-3 px-1 text-center">
                        <Link
                          to={`/edit/${product.id}`}
                          className="font-medium bg-blue-400 hover:bg-blue-500 px-3 py-1 rounded text-white mr-1"
                        >
                          <i className="ri-edit-line"></i>
                        </Link>
                        <button
                          onClick={() => delProduct(product.id)}
                          className="font-medium bg-red-400 hover:bg-red-500 px-3 py-1 rounded text-white mr-1"
                        >
                          <i className="ri-delete-bin-line"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : loading ? (
                <tr>
                  <td colSpan={4}></td>
                </tr>
              ) : (
                <tr>
                  <td colSpan={4}>{error ? error : "No Data"}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
