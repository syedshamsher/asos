import React from 'react'
import { getAllProducts } from '../../Redux/AllProducts/actions';
import { getActiveUser, getCartData } from '../../Redux/Auth/actions';
import styles from './style.module.css';
import { useDispatch, useSelector } from "react-redux";
import { CarouselContainer } from '../../Components/Carousel/firstCarousel//CarouselContainer';
import { Container, Grid } from '@material-ui/core';
import { AllProductItem } from '../../Components/AllProductItem/AllProductItem';

const breakPoints = [

    { width: 200, itemsToShow: 1 },
    { width: 300, itemsToShow: 1 },
    { width: 480, itemsToShow: 2 },
    { width: 750, itemsToShow: 3 },
    { width: 905, itemsToShow: 4 },
    { width: 1200, itemsToShow: 5 },
    { width: 1500, itemsToShow: 5 }
  ];

export const Home = () => {
    const allProducts = useSelector(state => state.allProducts.allProducts)
    const dispatch = useDispatch()
    
    React.useEffect(() =>{
        dispatch(getAllProducts())
        dispatch(getActiveUser())
        dispatch(getCartData())
    },[dispatch])
    
    return (
        <div className={styles.wrapper}>
            <div className={styles.discountDiv}>
                    <div className={styles.discountDivLeft}>
                        <p>EXTRA 15% OFF OUTLET &amp; SALE* <br/> (UP TO 70% OFF ALREADY!) <br/> With code: SAVEMORE</p>
                    </div>
                    <div className={styles.discountDivRight}>
                        <p>PREMIER DELIVERY<br/>Unlimited free Next-Day Delivery for a whole year <br/> for £9.95. Ts&amp;Cs  apply</p>
                    </div>
            </div>
            <div className= {styles.offer1}>
                    <div className= {styles.offerHeading1}>
                        <div className= {styles.offerHeading1Sub}>
                            <h1>BLACK<span>FRIDAY</span> <br/> <span>WARM</span>UP!!! </h1>
                        </div>
                    </div>
                    <div className= {styles.offerHeading2}>
                        <h1>UP TO 50% OFF </h1>
                        <h1>1,000S OF STYLES! </h1>
                    </div>
            </div>
            <div className={styles.bannerWrapper}>
                        <div className={styles.banner} >
                        <div className= {styles.offerHeading3}>
                            <h1>SALE: FINAL</h1>
                            <h1>REDUCTIONS</h1>
                            <h1>UPTO 80% OFF</h1>
                        </div>
                            <button>SHOP THE EDIT</button>
                        </div>
                        <div> <CarouselContainer breakPoints={breakPoints} allProducts={allProducts} /> </div>
            </div>
            <Container >
                <div style={{display: 'flex', justifyContent:'center', alignItems: 'center'}}> 
                <Grid container spacing={2} className="" >
                    {
                        allProducts.slice(0, 8).map((product) => {
                        return (
                                <Grid item  xs={12}  sm={6} md={3} xl={3} className="" key = {product.id}>
                                    <AllProductItem {...product} />
                                </Grid>
                        )
                        })
                    }
                </Grid>
                </div>
            </Container>
            <div className= {styles.offer2}>
                        <div>
                            <div className= {styles.offer2Heading1}>
                                <h1>HEY, BEST GIFT EDIT EVER! </h1>
                                <h1>SHOP IT NOW</h1>
                            </div>
                        </div>
                        <div className= {styles.offer2Heading2}>
                        Limited time only. Selected styles marked down on site.
                        </div>
            </div>
            <Container >
                <div style={{display: 'flex', justifyContent:'center', alignItems: 'center'}}> 
                <Grid container spacing={2} className="" >
                    {
                        allProducts.slice(8, 16).map((product) => {
                        return (
                                <Grid item  xs={12}  sm={6} md={3} xl={3} className="" key = {product.id}>
                                    <AllProductItem {...product} />
                                </Grid>
                        )
                        })
                    }
                </Grid>
                </div>
            </Container>
        </div>
    )
}
