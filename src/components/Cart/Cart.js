import React, { useContext, useState } from 'react';

import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import Checkout from './Checkout';

const Cart = (props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const [confirmOrder, setConfirmOrder] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };


  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };

  const orderHandler = () => {
    setCheckout(true)
  };

  const cancelCheckoutHandler = () => {
    setCheckout(false);
  };

  const orderConfirmHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch('https://react-http-6b23a-default-rtdb.firebaseio.com/orders.json', {
      method: 'POST',
      body: JSON.stringify({
        user: userData,
        orderedItems: cartCtx.items
      })
    });
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();


  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalContent = <React.Fragment>
    {cartItems}
    <div className={classes.total}>
      <span>Total Amount</span>
      <span>{totalAmount}</span>
    </div>
    {hasItems && <Checkout onCancel={props.onClose} onConfirm={orderConfirmHandler} />}
    {checkout && <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={cancelCheckoutHandler}>
        Close
        </button>
      {hasItems && <button className={classes.button} onClick={orderHandler} >Order</button>}
    </div>}
  </React.Fragment>

  const modalIsSubmittingContent = <p>Sending your order to be prepared.</p>

  const modalDidSubmitContent = <React.Fragment>
    <p>Successfully sent your order.</p>
    <div className={classes.actions}>
      <button className={classes.button} onClick={props.onClose} >Close</button>
    </div>
  </React.Fragment>

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && modalContent}
      {isSubmitting && modalIsSubmittingContent}
      {!isSubmitting && didSubmit && modalDidSubmitContent}
    </Modal>
  );
};

export default Cart;
