import { act, createContext, useContext, useReducer } from "react";
import React from "react";

const CartStatContext = createContext();
const CardDispatchContext = createContext();

 const reducer = (state, action) => {
  switch(action.type){
    case "ADD": return [...state,{ id: action.id, name:action.name, price:action.price,qut:action.qut,size:action.size, img:action.img}]
    case "REMOVE": 
    let newArr = [...state]
    newArr.splice(action.index,1)
    return newArr;
   

    case "UPDATE":
      let arr = [...state];
      arr.forEach((food, index) => {
        if (food.id === action.id) {
          console.log(food.qut, parseInt(action.qut), action.price + food.price);
          arr[index] = { 
            ...food, 
            qut: parseInt(action.qut) + food.qut, 
            price: action.price + food.price 
          };
        }
      });
      return arr;
          case "DROP":
            let EmptyArr =[]
            return EmptyArr;

      default :console.log("Error a Reducer");
  }
 };
 
export const Cartprovider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);
  return (
    <CardDispatchContext.Provider value={dispatch}>
      <CartStatContext.Provider value={state}>
        {children}
      </CartStatContext.Provider>
    </CardDispatchContext.Provider>
  );
};



export const useCart = ()=> useContext(CartStatContext)
export const useDispatch = ()=> useContext(CardDispatchContext)