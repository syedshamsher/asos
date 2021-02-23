import { Avatar, Box, Container, Grid, Typography } from '@material-ui/core'
import React from 'react'
import styles from './style.module.css'
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { getActiveUser, getCartData, getOrderData } from '../../Redux/Auth/actions';
import { loadData } from '../../Utils/LocalStorage';
import { Redirect } from 'react-router-dom';

const Button = styled.button`
    width: 32%;
    height: 50px;
    margin: 1px;
    font-size: 16px;
    letter-spacing: .2rem;
    font-weight: bolder;
    outline: none;
    border: none;
    color: whitesmoke;
    background-color: #333333;
`

const useStyles = makeStyles((theme) => ({
    root : {
        width: '100%'
    },
    avatar : {
        top: '60px',
        width: '125px',
        height: '125px',
        border: '5px solid white',
        fontSize: '30px',
        fontWeight: '700',
        letterSpacing: '0px'
    },
    cont: {
        display: 'flex', 
        justifyContent:'center', 
        alignItems: 'center', 
        flexDirection: 'column'
    },
    box: {
        width: '80%',
        backgroundColor: '#EEEEEE',
        margin: '20px',
        padding: '20px'
    },
  }));
export const Profile = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const activeUser = useSelector(state => state.auth.activeUser)
    const orders = useSelector(state => state.auth.orders)
    let localToken = loadData('token')
    console.log(orders)

    const handleOrderDetails = () => {


    }

    React.useState(() => {
        dispatch(getActiveUser())
        dispatch(getCartData())
        dispatch(getOrderData())
    },[dispatch]);

    return (
        <>
        {
            !localToken && <Redirect to='/auth' />
        }
        {
            localToken  && orders.order.length === undefined &&
                (<div className={classes.root}>
                        <div className={styles.main}>
                            <Avatar className={classes.avatar}>
                                {activeUser.first_name}
                            </Avatar>
                        </div>
                        <div className={styles.orderHeading}>
                            <h1>{activeUser.first_name}'s Account</h1>
                        </div>
                        <Container className={classes.cont}>
                            <Box className={classes.box}>
                                <Typography variant="h6" >
                                    ORDERS
                                </Typography>
                                <Typography>
                                    You currently have no orders
                                </Typography>
                                <Button>
                                    START SHOPPING
                                </Button>
                            </Box>
                        </Container>
                </div>)
        }
        {
            localToken && orders.order.length > 0 &&
                (<div className={classes.root}>
                    <div className={styles.main}>
                        <Avatar className={classes.avatar}>
                            {activeUser.first_name}
                        </Avatar>
                    </div>
                    <div className={styles.orderHeading}>
                        <h1>{activeUser.first_name}'s Account</h1>
                    </div>
                    <Container className={classes.cont}>
                        <Box className={classes.box}>
                            <Typography variant="h6" >
                                ORDERS
                            </Typography>
                            <Grid container spacing={2} >
                                <Grid item xs={12} sm={12} md={12} xl={12}>
                                    <div className={styles.left} >
                                        <div className={styles.bag}>
                                            <div className={styles.bagHead}>
                                                <div>ORDER HISTORY</div>
                                                <div>
                                                    showing all previous order history
                                                </div>
                                            </div>
                                            {
                                                orders.order?.map((item, i) => {
                                                    return(
                                                        <div key={i} className={styles.bagBody}>
                                                            <div >
                                                                {
                                                                    item.order_items.map((item, i) => {
                                                                        return(
                                                                            <div className={styles.imgCont} key={i}>
                                                                                <img src={`http://${item.imgURL}`} alt="prod"/>
                                                                                <div>
                                                                                  <p>{item.title}</p>
                                                                                  <p> Price: {item.price}</p>
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    })
                                                                }
                                                            </div>
                                                            <div className={styles.prodDetails}>
                                                                <h4> Total Price: {item.amount}</h4>
                                                                <h4>Date: {item.order_date.substring(0, item.order_date.length - 3)}</h4>
                                                                <div className={styles.colorAndRemove}>
                                                                    <p onClick={() => handleOrderDetails(item._id)} className={styles.remove}>VIEW IN DETAIL</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>
                        </Box>
                    </Container>
                </div>)
        }
    </>
    )
}
