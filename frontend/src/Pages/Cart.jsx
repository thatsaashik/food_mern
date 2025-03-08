import React  from 'react';
import { useCart, useDispatch} from '../Components/ContextReducer';
import { MdDeleteOutline } from "react-icons/md";

export default function Cart() {
  let data = useCart();
  let dispatch = useDispatch();

  if (data.length === 0) {
    return (
      <div>
        <div className='m-5 w-full text-center text-xl'>The Cart is Empty!</div>
      </div>
    );
  }

  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("UserEmail");
    let response = await fetch("http://localhost:3000/api/orderData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString(),
      }),
    });
    

    if (response.status === 200) {
      dispatch({ type: "DROP" });
    }
  };

  let totalPrice = data.reduce((total, food) => total + food.price, 0);
  return (
    <div>
      <div className='container mx-auto mt-5 overflow-x-auto'>
        <table className='table-auto w-full border-collapse border border-gray-200'>
          <thead className='bg-green-100 text-green-600 text-lg'>
            <tr>
              <th className='border border-gray-200 p-2'>#</th>
              <th className='border border-gray-200 p-2'>Name</th>
              <th className='border border-gray-200 p-2'>Quantity</th>
              <th className='border border-gray-200 p-2'>Option</th>
              <th className='border border-gray-200 p-2'>Amount</th>
              <th className='border border-gray-200 p-2'></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr key={index} className='odd:bg-gray-50 even:bg-gray-100'>
                <td className='border border-gray-200 p-2 text-center'>{index + 1}</td>
                <td className='border border-gray-200 p-2'>{food.name}</td>
                <td className='border border-gray-200 p-2 text-center'>{food.qut}</td>
                <td className='border border-gray-200 p-2 text-center'>{food.size}</td>
                <td className='border border-gray-200 p-2 text-center'>{food.price}</td>
                <td className='border border-gray-200 p-2 text-center'>
                  <button
                    type="button"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => {
                      dispatch({ type: "REMOVE", index: index });
                    }}
                  >
                   <MdDeleteOutline />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='mt-5 text-2xl font-semibold text-center'>
          Total Price: <span className="text-green-600">{totalPrice}/-</span>
        </div>
        <div className='text-center mt-5'>
          <button
            className='px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700'
            onClick={handleCheckOut}
          >
            Check Out
          </button>
        </div>
      </div>
    </div>
  );
}
