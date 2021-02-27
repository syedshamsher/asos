import { Card, Container, Grid } from '@material-ui/core';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AllProductItem } from '../../Components/AllProductItem/AllProductItem';
import { getAllProducts } from '../../Redux/AllProducts/actions';
import { getActiveUser, getCartData } from '../../Redux/Auth/actions';
import { makeStyles } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles({
    card: {
        marginTop:'5px', 
        width: '290px', 
        height:'360px', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center'
    },

})

export const Searched = () => {

    const allProducts = useSelector(state => state.allProducts.allProducts)
    const [loading, setLoading] = React.useState(false)
    const classes = useStyles();
    const dispatch = useDispatch()
    
    React.useEffect(() =>{
        setLoading(true)
        setTimeout(() => setLoading(false),1000)
        dispatch(getAllProducts())
        dispatch(getActiveUser())
        dispatch(getCartData())
    },[])

    return (
        <Container >
            <div style={{display: 'flex', justifyContent:'center', alignItems: 'center'}}> 
            <Grid container spacing={2} className="" >
                {
                    allProducts.map((product) => {
                    return (
                            <Grid item  xs={12}  sm={6} md={3} xl={3} className="" key = {product.id}>
                                { loading ?
                                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                                        <Card className={classes.card}>
                                            <Skeleton variant="rect" animation="wave" width="95%" height={300} />
                                        </Card>
                                        <div style={{width: '290px'}} >
                                            <Skeleton width="80%" height={30} />
                                            <Skeleton width="40%" height={20} /> 
                                        </div>
                                    </div>
                                        :
                                    <AllProductItem {...product} />
                                }
                            </Grid>
                    )
                    })
                }
            </Grid>
            </div>
        </Container>
    )
}
