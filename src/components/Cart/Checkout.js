import classes from './Checkout.module.css';
import { useRef, useState } from 'react';


const isEmpty = value => value.trim() === '';
const isFiveChars = value => value.trim().length === 5;

const Checkout = (props) => {
    const [formInputsValidity, setFormInputsValidity] = useState({
        name: true,
        street: true,
        postalCode: true,
        city: true
    })
    const nameRef = useRef();
    const streetRef = useRef();
    const postalCodeRef = useRef();
    const cityRef = useRef();

    const confirmHandler = (event) => {
        const enteredName = nameRef.current.value;
        const enteredStreet = streetRef.current.value;
        const enteredPostalCode = postalCodeRef.current.value;
        const enteredCity = cityRef.current.value;

        const nameIsValid = !isEmpty(enteredName);
        const streetIsValid = !isEmpty(enteredStreet);
        const postalCodeIsValid = isFiveChars(enteredPostalCode);
        const cityIsValid = !isEmpty(enteredCity);

        setFormInputsValidity({
            name: nameIsValid,
            street: streetIsValid,
            postalCode: postalCodeIsValid,
            city: cityIsValid
        })

        const formIsValid = nameIsValid && streetIsValid && postalCodeIsValid && cityIsValid;

        event.preventDefault();
        if (!formIsValid) {
            return;
        }

       props.onConfirm({
           name: enteredName,
           street: enteredStreet,
           postalCode: enteredPostalCode,
           city: enteredCity
       })

    };
    const nameControlClasses = `${classes.control} ${formInputsValidity.name ? '' : classes.invalid}`;
    const streetControlClasses = `${classes.control} ${formInputsValidity.street ? '' : classes.invalid}`;
    const postalCodeControlClasses = `${classes.control} ${formInputsValidity.postalCode ? '' : classes.invalid}`;
    const cityControlClasses = `${classes.control} ${formInputsValidity.city ? '' : classes.invalid}`;


    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={nameControlClasses}>
                <label htmlFor='name'>Your Name</label>
                <input type='text' id='name' ref={nameRef} />
                {!formInputsValidity.name && <p>Please enter a valid name</p>}
            </div>
            <div className={streetControlClasses}>
                <label htmlFor='street'>Street</label>
                <input type='text' id='street' ref={streetRef} />
                {!formInputsValidity.street && <p>Please enter a valid street</p>}
            </div>
            <div className={postalCodeControlClasses}>
                <label htmlFor='postal'>Postal Code</label>
                <input type='text' id='postal' ref={postalCodeRef} />
                {!formInputsValidity.postalCode && <p>Please enter a valid Postal Code</p>}
            </div>
            <div className={cityControlClasses}>
                <label htmlFor='city'>City</label>
                <input type='text' id='city' ref={cityRef} />
                {!formInputsValidity.city && <p>Please enter a valid city</p>}
            </div>
            <div className={classes.actions}>
                <button type='button' onClick={props.onCancel}>
                    Cancel
        </button>
                <button className={classes.submit} >Confirm</button>
            </div>
        </form>
    );
};

export default Checkout;