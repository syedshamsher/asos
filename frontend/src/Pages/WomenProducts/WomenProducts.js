import React from 'react'
import { Card, Container, Grid } from '@material-ui/core'
import { WomenProductItem } from '../../Components/WomenProductItem/WomenProductItem'
import { getWomenProducts } from '../../Redux/WomenProducts/actions'
import { useDispatch, useSelector } from "react-redux";
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

export function WomenProducts() {
    const womenProducts = useSelector(state => state.womenProducts.womenProducts)
    const dispatch = useDispatch()
    const [loading, setLoading] = React.useState(false)
    const classes = useStyles();

    React.useEffect(() =>{
        setLoading(true)
        setTimeout(() => setLoading(false),1000)
        dispatch(getWomenProducts())
    },[])
    return (
        <Container >
            <div style={{display: 'flex', justifyContent:'center', alignItems: 'center'}}> 
            <Grid container spacing={2} className="" >
                {
                    womenProducts.map((product) => {
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
                                    <WomenProductItem {...product} />
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
