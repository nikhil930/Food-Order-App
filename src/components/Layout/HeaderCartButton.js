import CartIcon from '../Cart/CartIcon'
import classes from './HeaderCartButton.module.css'
import { useContext ,useEffect,useState } from 'react'
import CartContext  from '../../store/cart-context'

const HeaderCartButton=props=>{

        const cartCtx=useContext(CartContext);
        const[btnIsHighlighted, setButtonIsHighlighted] = useState(false);
    const numberofCartItems= cartCtx.items.reduce((curNumber , item)=>{
        return curNumber+item.amount
    } , 0);

    const btnClasses=`${classes.button} ${btnIsHighlighted? classes.bump:null}`
 const {items}= cartCtx;
     useEffect(() =>{
        if(items.length===0)
        return;
    setButtonIsHighlighted(true);
     const timer= setTimeout(()=>{
            setButtonIsHighlighted(false);
        },300);

        return () =>{
            clearTimeout(timer);
        };
},[items])

    return <button className={btnClasses} onClick={props.onClick}>
        <span className={classes.icon}>
        <CartIcon />
        </span>
        <span>
        Your Cart
        </span>
        <span className={classes.badge}>
            {numberofCartItems}
        </span>
    </button>
}
export default HeaderCartButton;