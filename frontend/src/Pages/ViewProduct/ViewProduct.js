import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';
import styles from './ViewProduct.module.css'
import { Button, Grid } from '@material-ui/core'
import { addToCart } from '../../Redux/Cart/actions';

export function ViewProduct() {
    const menProducts = useSelector(state => state.menProducts.menProducts);
    const womenProducts = useSelector(state => state.womenProducts.womenProducts);
    const activeUser = useSelector(state => state.auth.activeUser)
    const [localState, setLocalState] = React.useState()
    let history = useHistory()
    const dispatch = useDispatch()
    let urlArray = history.location.pathname.split("/")
    let id = urlArray[2]
    
    const getProductById = (id) => {
        return menProducts?.find((product) => product.id === id) || womenProducts?.find((product) => product.id === id)
      }
    
    const add = () => {
      console.log(activeUser)
      let addToCartDetails = {
        user_id: activeUser._id,
        cart: localState
      }
      dispatch( addToCart(addToCartDetails) )
    }

    React.useEffect(() => {
      var product = getProductById( id )
      setLocalState(product)
  },[])

    return !localState ? (
            <h3>No product Found</h3>
          ) : (
            <div>
                <div>
                  <Grid container spacing={4} >
                      <Grid item  xs={12}  sm={6} md={6} xl={6}  >
                        <div className={styles.imgWrapper}>
                          <p> {localState.title} </p>
                          <img src={`http://${localState.imgURL}`} alt="product"/>
                        </div>
                      </Grid>
                      <Grid item  xs={12}  sm={6} md={6} xl={6} >
                        <div className={styles.descriptionWrapper}>
                          <p className={styles.title}> {localState.title} </p>
                          <h3 className={styles.price}> ₹  {localState.price} </h3>
                          <p> Free delivery (Ts &amp; Cs apply) </p>
                          <p className={styles.color}> Color :<span> {localState.color} </span> </p>
                          <Button id={styles.btn} onClick={add} >ADD TO BAG</Button>
                          <div className={styles.size}>
                            <h5>SIZING HELP</h5>
                            <p>Still unsure what size to get? <span>Find your <br/> recommended size. </span></p>
                          </div>
                        </div>
                      </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid item  xs={12}  sm={12} md={4} xl={4}>
                        <div className={styles.details1}>
                            <p  className={styles.details}>PRODUCT DETAILS</p>
                            <ul>
                              { localState.productDetails.map((item,i) => (
                              <li key={i}> {item} </li>
                            ))}
                            </ul>
                        </div>
                    </Grid>
                    <Grid item  xs={12}  sm={12} md={4} xl={4}>
                        <div className={styles.details2}>
                          <p className={styles.brand}>BRAND</p>
                          <p> {localState.brandDetails} </p>
                        </div>
                    </Grid>
                    <Grid item  xs={12}  sm={12} md={4} xl={4}>
                        <div className={styles.details3}>
                            <div>
                              <p  className={styles.lookAfter}>LOOK AFTER ME:</p>
                              <p> {localState.lookAfterMe} </p>
                            </div>
                            <div >
                              <p className={styles.about}>ABOUT ME:</p>
                              <p> {localState.aboutMe} </p>
                            </div>
                            <div >
                              <p className={styles.main}>MAIN:</p>
                              <p> {localState.Main} </p>
                            </div>
                        </div>
                    </Grid>
                  </Grid>
                </div>
            </div>
        )
}
