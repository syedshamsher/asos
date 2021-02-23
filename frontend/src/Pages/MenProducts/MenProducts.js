import React from 'react'
import { Container, Grid } from '@material-ui/core'
import { MenProductItem } from '../../Components/MenProductItem/MenProductItem'
import { getMenProducts } from '../../Redux/MenProducts/actions'
import { useDispatch, useSelector } from "react-redux";

export function MenProducts() {
    const menProducts = useSelector(state => state.menProducts.menProducts)
    // console.log(menProducts)
    const dispatch = useDispatch()

    React.useEffect(() =>{
        dispatch(getMenProducts())
    },[])
    return (
        <Container >
            <div style={{display: 'flex', justifyContent:'center', alignItems: 'center'}}> 
            <Grid container spacing={2} className="" >
                {
                    menProducts.map((product) => {
                    return (
                            <Grid item  xs={12}  sm={6} md={3} xl={3} className="" key = {product.id}>
                                <MenProductItem {...product} />
                            </Grid>
                    )
                    })
                }
            </Grid>
          </div>
        </Container>
    )
}
