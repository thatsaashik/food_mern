import React, { useEffect, useRef, useState } from "react";
import { useCart, useDispatch } from "./ContextReducer";

const Card = (props) => {
  let options = props.options || {}; // Fallback to an empty object if undefined or null
  let PriceOption = Object.keys(options);

  const dispatch = useDispatch();
  const data = useCart();
  const priceRef = useRef();

  const [qut, setQut] = useState(1);
  const [size, setSize] = useState("");

  const HandleAddTocart = async () => {
    let food = [];
    for (const item of data) {
      if (item.id === props.foodItem._id) {
        food = item;
        break;
      }
    }
    if (food.length !== 0) {
      if (food.size == size) {
        await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qut: qut });
        return;
      } else if (food.size !== size) {
        await dispatch({
          type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qut: qut, size: size
        });
        return;
      }
      return;
    }
    await dispatch({
      type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qut: qut, size: size,
    });
  };

  let finalPrice = qut * parseInt(options[size]);

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  return (
    <div className="max-w-sm border mt-10 m-4 border-gray-600 rounded-lg shadow hover:shadow-xl transform transition duration-500 hover:scale-105">
      <a href="#">
        <img
          className="rounded-xl h-[11rem] w-[99%] p-2 transition-transform duration-300 ease-in-out hover:scale-90"
          src={props.foodItem.img}
          alt=""
        />
      </a>
      <div className="p-3">
        <h1 className="mt-1 text-xl font-bold mb-2">{props.foodItem.name}</h1>
        <div className="inline text-[14px] font-bold">Total  ₹{finalPrice}/-  </div>
        <div className="container w-100 mt-1 flex flex-col md:flex-row items-center space-x-2">
          <select
            onChange={(e) => setQut(e.target.value)}
            className="h-10 text-white cursor-pointer bg-yellow-800 border border-black mb-2 md:mb-0"
          >
            {Array.from(Array(6), (e, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
          <select
            ref={priceRef}
            onChange={(e) => setSize(e.target.value)}
            className="m-2 h-10 text-white cursor-pointer bg-yellow-800 border border-black"
            style={{ maxHeight: "200px" }}
          >
            {PriceOption.map((data) => {
              return <option key={data} value={data}>{data}</option>;
            })}
          </select>
        </div>
        <hr />
        <div className="w-full mt-2">
          <button
            onClick={HandleAddTocart}
            className="w-full bg-green-800 text-white px-3 py-1 rounded transform transition-transform active:scale-105 hover:bg-green-600 duration-300"
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
