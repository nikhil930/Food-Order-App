import classes from './MealItemForm.module.css'
import Input from '../../UI/Input'
import { useRef,useState } from 'react';

const MealItemForm = props =>{
    const amountInputRef=useRef();
    
    const [amountIsValid,setAmountisValid]=useState(true);

    const submitHandler =Event =>{
        Event.preventDefault()

        const enterdAmount = amountInputRef.current.value;
        const enterdAmountNumber=+enterdAmount;

        if(enterdAmount.trim().length===0||
        enterdAmountNumber<1||
        enterdAmountNumber>5)
        {
            setAmountisValid(false);
            return;
        }
        props.onAddToCart(enterdAmountNumber);
    }
    return <form className={classes.form} onSubmit={submitHandler}>
        <Input 
        ref={amountInputRef}
        label="Amount" 
        input={{
            id:'amount_'+props.id,
            type:'number',
            min:'1',
            max:'5',
            step:'1',
            defaultValue:'1'
        }} />
        <button >+ Add</button>
        {!amountIsValid &&<p>Please enter a value between 1-5</p>}        
    </form>
}

export default MealItemForm;