import classes from './Cart.module.css';
import Modal from '../UI/Modal'
import { useContext , useState } from 'react';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import CheckOut from './CheckOut';
import React from 'react'


const Cart = props =>{
    const cartCtx=useContext(CartContext);

    const [checkOut ,setIsCheckOut] = useState(false);
    const [isSubmitted ,setIsSubmitted] =useState(false);
    const [didSubmit ,setDidSubmit] = useState(false);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
     const hasItems= cartCtx.items.length>0;
    const cartItemRemoveHandler = id=>{
        cartCtx.removeItem(id);
    };

    const cartItemAddHandler=item=>{
        const cartItem={...item,amount:1}
        cartCtx.addItem(cartItem);
    };
    const eventClickHandler = async(userdata) =>{
        setIsSubmitted(true);
       await fetch('https://react-http-8d93b-default-rtdb.firebaseio.com/food.json',
        {
            method:'POST',
            body:JSON.stringify({
                user:userdata,
                cart:cartCtx.items}),
            headers:{
                'Content-Type':'application/json'
            }
        })

        setIsSubmitted(false);
        setDidSubmit(true);
        cartCtx.clearOnSubmit();
        // if(!response.ok)
        // {
        //     // console.log("^");
        //     throw new Error('Something went wrong');
        // }

        // const data = response.json();
        // console.log(data);
    }

    const orderHandler = ()=>{
        setIsCheckOut(true);
    }

    const CartItems=<ul className={classes['cart-items']}>
    {
        cartCtx.items.map(item=>{
         return <li><CartItem key={item.id}
         name={item.name}
         amount={item.amount}
         price={item.price}
         onRemove={cartItemRemoveHandler.bind(null,item.id)}
         onAdd={cartItemAddHandler.bind(null,item)}
         />
         </li>
        })
    }
</ul>

    const cartModalContent =
    <>
    
          {CartItems}
          <div className={classes.total}>
              <span>Total Amount</span>
              <span>{totalAmount}</span>
          </div>
         {checkOut&&<CheckOut onCancel={props.onClose} onAdd={eventClickHandler}/>}
         { !checkOut && 
          <div className={classes.actions}>
              <button className={classes['button--alt']}  onClick={props.onClose}>Close</button>
              {hasItems&&<button className={classes.button} onClick={orderHandler}>Order</button>}
          </div>
          }
          
     </>
const SubmittingModalContent=<h2>Sending order...</h2>
const SubmittedModalContent=
<>
<h2>Order is successfully placed.</h2>
<div className={classes.actions}>
    <button type ='submit' onClick={props.onClose}>Close</button>
</div> ;
</>
   
  return(
    <Modal onClose={props.onClose}>
    {!isSubmitted && !didSubmit && cartModalContent}
    {isSubmitted && SubmittingModalContent}
    {didSubmit && SubmittedModalContent}

</Modal>
     
  ) 
}

export default Cart;