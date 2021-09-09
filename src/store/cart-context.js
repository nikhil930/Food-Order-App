import React ,{useContext} from "react";

const CartContext=React.createContext({
    items:[],
    totalAmount:0,
    addItem:(item) =>{},
    removeItem:(id)=>{},
    clearOnSubmit:()=>{}

})

export default CartContext;
