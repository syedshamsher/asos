import { Avatar, Box, CircularProgress, Container, Grid, Typography } from '@material-ui/core'
import React from 'react'
import styles from './style.module.css'
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { getActiveUser, getCartData, getOrderData } from '../../Redux/Auth/actions';
import { loadData } from '../../Utils/LocalStorage';
import { Redirect, useHistory } from 'react-router-dom';
import { logout } from '../../Redux/Auth/actions'


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

const Logout = styled.button`
    width: 10%;
    height: 50px;
    margin: 1px;
    font-size: 16px;
    letter-spacing: .2rem;
    font-weight: bolder;
    outline: none;
    border: none;
    color: whitesmoke;
    background-color: #333333;
    margin-bottom: 20px;
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
    const {order} = useSelector(state => state.auth.orders)
    const [isLoading, setIsLoading] = React.useState(false)
    let localToken = loadData('token')
    const history = useHistory()
    console.log( activeUser )
    const handleOrderDetails = () => {
        
        
    }

    
    const handleLogout = () => {
        setIsLoading( true)
        
        setTimeout(() => {
            dispatch(logout())
            setIsLoading( false )
        },1000)
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
            localToken  && !order &&
                (<div className={classes.root}>
                        <div className={styles.main}>
                            <Avatar className={classes.avatar}>
                                {activeUser.first_name}
                            </Avatar>
                        </div>
                        <div className={styles.orderHeading}>
                            <h1>{activeUser.first_name}'s Account</h1>
                            <Logout onClick={handleLogout}>
                                { isLoading && <CircularProgress size={20} color="inherit" /> }
                                { !isLoading && 'LOGOUT'}
                            </Logout>
                        </div>
                        <Container className={classes.cont}>
                            <Box className={classes.box}>
                                <Typography variant="h6" >
                                    ORDERS
                                </Typography>
                                <Typography>
                                    You currently have no orders
                                </Typography>
                                <Button onClick={() => history.push('/')}>
                                    START SHOPPING
                                </Button>
                            </Box>
                        </Container>
                </div>)
        }
        {
            localToken && order &&
                (<div className={classes.root}>
                    <div className={styles.main}>
                        <Avatar className={classes.avatar}>
                            {activeUser.first_name}
                        </Avatar>
                    </div>
                    <div className={styles.orderHeading}>
                        <h1>{activeUser.first_name}'s Account</h1>
                        <Logout onClick={handleLogout}>
                                { isLoading && <CircularProgress size={20} color="inherit" /> }
                                { !isLoading && 'LOGOUT'}
                        </Logout>
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
                                                order?.reverse().map((item, i) => {
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
