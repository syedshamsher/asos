import React from 'react'
import { Container, Grid } from '@material-ui/core'
import { WomenProductItem } from '../../Components/WomenProductItem/WomenProductItem'
import { getWomenProducts } from '../../Redux/WomenProducts/actions'
import { useDispatch, useSelector } from "react-redux";

export function WomenProducts() {
    const womenProducts = useSelector(state => state.womenProducts.womenProducts)
    // console.log(womenProducts)
    const dispatch = useDispatch()

    React.useEffect(() =>{
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
                                <WomenProductItem {...product} />
                            </Grid>
                    )
                    })
                }
            </Grid>
          </div>
        </Container>
    )
}
