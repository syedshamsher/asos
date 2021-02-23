import { Grid } from '@material-ui/core'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom'
import { getCartData, getActiveUser } from '../../Redux/Auth/actions'
import {  removeFromCart } from '../../Redux/Cart/actions'
import { loadData } from '../../Utils/LocalStorage'
import styles from './Cart.module.css'

export const Cart = () => {
    const cart = useSelector(state => state.auth.cart);
    const isLoading = useSelector(state => state.cart.isLoading)
    const dispatch = useDispatch();
    const history = useHistory();
    
    const url = history.location.pathname

    React.useEffect(() => {
        dispatch(getCartData())
        dispatch(getActiveUser())
    },[dispatch, isLoading])

    console.log(cart)

    //deletes item from Cart
    const handleDeleteFromCart = async(id) => {
        let removeFromCartDetails = {
            user_id: cart.user_id,
            prodId: id
        }
        await dispatch(removeFromCart(removeFromCartDetails))
        await dispatch(getCartData())
    }

    let localToken = loadData('token')
    
    let sum = cart.cart?.reduce((a, e) => {
        return a + Number(e.price)
    }, 0)

    return (
        <div className={styles.wrapper}>
            {
                !localToken && <Redirect to='/auth' /> 
            }
            {    localToken && !cart &&
                (<Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={6} xl={6}>
                    <div className={styles.left} >
                        <div className={styles.bag}>
                            <div className={styles.bagHead}>
                                <div>MY BAG</div>
                                <div>
                                    Items are reserved for 60 minutes
                                </div>
                            </div>
      
                            <div className={styles.bagBody}>

                                <div className={styles.prodDetails}>
                                    <h1>YOUR CART IS EMPTY</h1>
                                </div>
                            </div>
                                    
                            <div className={styles.bagFooter}>
                                <div className={styles.footerInner}>
                                    <div>SUB-TOTAL</div>
                                    <div>{sum}</div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.delivery}>
                            <h2>FREE* STANDARD DELIVERY</h2>
                            <p>Faster delivery options available to most countries</p>
                            <a href="#">More info</a>
                        </div>
                        <div className={styles.return}>
                            <h2>EASY RETURNS</h2>
                            <p>Send it back within 45 days of receiving your order.</p>
                            <p>Ts&amps;Cs and country exclusions apply</p>
                            <a href="#">More info</a>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12} sm={12} md={6} xl={6}>
                    <div className={styles.right} >
                        <div className={styles.total}>
                            <div className={styles.totalHead}>
                                <h2>TOTAL</h2>
                            </div>
                            <div className={styles.totalBody}>
                                <div className={styles.subTotal}>
                                    <h4>Sub-total</h4>
                                    <p>{sum}</p>
                                </div>
                                <button disabled={true}>CHECKOUT</button>
                            </div>
                            <div className={styles.footer}>
                                <div className={styles.weAccept}>WE ACCEPT:</div>
                                <div className={styles.payment}>
                                    <img src="https://images.asos-media.com/navigation/visa-png" alt="visa" width="25px"/>
                                    <img src="https://images.asos-media.com/navigation/mastercard-png" alt="mastercard" width="25px"/>
                                    <img src="https://images.asos-media.com/navigation/pay-pal-png" alt="paypal" width="25px"/>
                                    <img src="https://images.asos-media.com/navigation/american-express-png" alt="americanexpress" width="25px"/>
                                    <img src="https://images.asos-media.com/navigation/visa-electron-png" alt="visaelectron" width="25px"/>
                                </div>
                                <div className={styles.discount}>Got a discount code? Add it in the next step</div>
                            </div>
                        </div>
                    </div>
                </Grid>
            </Grid>) }
            
            {
            localToken && cart &&
            (<Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={6} xl={6}>
                    <div className={styles.left} >
                        <div className={styles.bag}>
                            <div className={styles.bagHead}>
                                <div>MY BAG</div>
                                <div>
                                    Items are reserved for 60 minutes
                                </div>
                            </div>
                            {
                                cart.cart?.map((item, i) => {
                                    return(
                                        <div key={i} className={styles.bagBody}>
                                            <div className={styles.imgCont}>
                                                <img src={`http://${item.imgURL}`} alt="prod"/>
                                            </div>
                                            <div className={styles.prodDetails}>
                                                <h4>{item.price}</h4>
                                                <p>{item.title}</p>
                                                <div className={styles.colorAndRemove}>
                                                    <p>{item.color}</p>
                                                    <p onClick={() => handleDeleteFromCart(item._id)} className={styles.remove}>REMOVE</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            <div className={styles.bagFooter}>
                                <div className={styles.footerInner}>
                                    <div>SUB-TOTAL</div>
                                    <div>{sum}</div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.delivery}>
                            <h2>FREE* STANDARD DELIVERY</h2>
                            <p>Faster delivery options available to most countries</p>
                            <a href="#">More info</a>
                        </div>
                        <div className={styles.return}>
                            <h2>EASY RETURNS</h2>
                            <p>Send it back within 45 days of receiving your order.</p>
                            <p>Ts&amps;Cs and country exclusions apply</p>
                            <a href="#">More info</a>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12} sm={12} md={6} xl={6}>
                    <div className={styles.right} >
                        <div className={styles.total}>
                            <div className={styles.totalHead}>
                                <h2>TOTAL</h2>
                            </div>
                            <div className={styles.totalBody}>
                                <div className={styles.subTotal}>
                                    <h4>Sub-total</h4>
                                    <p>{sum}</p>
                                </div>
                                <button onClick={() => history.push(`${url}/checkout`)}>CHECKOUT</button>
                            </div>
                            <div className={styles.footer}>
                                <div className={styles.weAccept}>WE ACCEPT:</div>
                                <div className={styles.payment}>
                                    <img src="https://images.asos-media.com/navigation/visa-png" alt="visa" width="25px"/>
                                    <img src="https://images.asos-media.com/navigation/mastercard-png" alt="mastercard" width="25px"/>
                                    <img src="https://images.asos-media.com/navigation/pay-pal-png" alt="paypal" width="25px"/>
                                    <img src="https://images.asos-media.com/navigation/american-express-png" alt="americanexpress" width="25px"/>
                                    <img src="https://images.asos-media.com/navigation/visa-electron-png" alt="visaelectron" width="25px"/>
                                </div>
                                <div className={styles.discount}>Got a discount code? Add it in the next step</div>
                            </div>
                        </div>
                    </div>
                </Grid>
            </Grid>)
            }
        </div>
    )
}
