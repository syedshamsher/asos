import { CircularProgress, Grid } from '@material-ui/core'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom'
import { getCartData, getActiveUser } from '../../Redux/Auth/actions'
import { loadData } from '../../Utils/LocalStorage'
import styles from './Checkout.module.css'
import styled from 'styled-components'
import Axios from 'axios'

const Input = styled.input`
  font-size: 18px;
  width: 70%;
  height: 35px;
  margin: 1px;
  background: white;
  border: 0.1px solid black;
  ::placeholder {
    color: grey;
  }
`;
const Select = styled.select`
  font-size: 18px;
  width: 70%;
  height: 35px;
  margin: 1px;
  background: white;
  border: 0.1px solid black;
  ::placeholder {
    color: grey;
  }
`;

const Button = styled.button`
    width: 71%;
    height: 50px;
    margin: 1px;
    font-size: 16px;
    letter-spacing: .2rem;
    font-weight: bolder;
    outline: none;
    border: none;
    color: whitesmoke;
    background-color: #018849;
`

export const Checkout = () => {
    const cart = useSelector(state => state.auth.cart);
    const activeUser = useSelector(state => state.auth.activeUser);
    const history = useHistory();
    const [isLoading, setIsLoading] = React.useState(false);
    const [email, setEmail] = React.useState("");
    const [firstname, setFirstName] = React.useState("");
    const [lastname, setLastName] = React.useState("");
    const [city, setCity] = React.useState("");
    const [country, setCountry] = React.useState("");
    const [postCode, setPostCode] = React.useState("");
    const [mobile, setMobile] = React.useState("");
    const [address, setAddress] = React.useState("");

    console.log(history);
    
    const dispatch = useDispatch()
    let localToken = loadData('token')

    let sum = cart.cart?.reduce((a, e) => {
        return a + Number(e.price)
    }, 0)
    
    const paymentHandler = async (e) => {
        e.preventDefault();
        const userDetail = {
            firstname: firstname,
            lastname: lastname,
            email: email,
            city: city,
            country: country,
            address: address,
            mobile: mobile,
            postCode: postCode
        }
        const API_URL = 'http://localhost:5000/asos/'
        const orderUrl = `${API_URL}order`;
        var today = new Date();
        var str = today.toGMTString();
        let payload = {
            user_id: activeUser._id,
            order: {
                amount: sum,
                order_items: [...cart.cart],
                order_date: str,
                user_details: userDetail
            },
        }
        let config = {
            method: 'POST',
            url: orderUrl,
            data: payload,
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const response = await Axios(config);
        const { data } = response;
        const options = {
          name: "Asos Payment",
          description: "Integration of Razorpay",
          order_id: data.id,
          handler: async (response) => {
            try {
              const paymentId = response.razorpay_payment_id;
              const url = `${API_URL}capture/${paymentId}`;
              config = {
                  method: 'POST',
                  url: url,
                  data: payload,
                  headers: {
                      'Content-Type': 'application/json'
                  }
              }
              await Axios(config)
                .then((res) => history.push('/user/profile'))
                .catch((err) => alert("error"))
              
            } catch (err) {
              console.log(err);
            }
          },
          modal: {
            ondismiss: function() {
                alert(`Payment Failed`)
            }
            },
          prefill: {
                email: activeUser.email,
            },
          theme: {
            color: "#c6203d",
          },
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
      };
    
    React.useEffect(() => {
        dispatch(getCartData())
        dispatch(getActiveUser())
    },[dispatch])

    return (
        <div className={styles.wrapper}>
            {
                !localToken && <Redirect to='/auth' /> 
            }
            {
            localToken && cart &&
            (<Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={6} xl={6}>
                    <div className={styles.left} >
                        <div className={styles.bag}>
                            <div className={styles.bagHead}>
                                <div>CHECKOUT</div>
                            </div>
                            <div>
                                <form onSubmit={paymentHandler} className={styles.form}>
                                    <div>ADD ADDRESS</div>
                                    <div className={styles.inputWrapper}>
                                        <div>
                                            Email:
                                        </div>
                                        <Input
                                            required
                                            name="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <br />
                                    <div className={styles.inputWrapper}>
                                        <div>
                                            First Name:
                                        </div>
                                        <Input
                                            required
                                            name="firstname"
                                            value={firstname}
                                            onChange={(e) => setFirstName(e.target.value)}
                                        />
                                    </div>
                                    <br />
                                    <div className={styles.inputWrapper}>
                                        <div>
                                            Last Name:
                                        </div>
                                        <Input
                                            required
                                            name="lastname"
                                            value={lastname}
                                            onChange={(e) => setLastName(e.target.value)}
                                        />
                                    </div>
                                    <br />
                                    <div className={styles.inputWrapper}>
                                        <div>
                                            Address:
                                        </div>
                                        <Input
                                            required
                                            name="address"
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                        />
                                    </div>
                                    <br />
                                    <div className={styles.inputWrapper}>
                                        <div>
                                            Country:
                                        </div>
                                        <Select
                                            required
                                            name="country"
                                            value={country}
                                            onChange={(e) => setCountry(e.target.value)}
                                        >   
                                            <option selected value> -- select an option -- </option>
                                            <option value="India" >India</option>
                                            <option value="United States" >United States</option>
                                            <option value="Greece" >Greece</option>
                                            <option value="China" >China</option>
                                            <option value="UK" >UK</option>
                                            <option value="United Arab Emirates" >United Arab Emirates</option>
                                            <option value="Dubai" >Dubai</option>
                                            <option value="Kenya" >Kenya</option>
                                            <option value="South Africa" >South Africa</option>
                                        </Select>
                                    </div>
                                    <br />
                                    <div className={styles.inputWrapper}>
                                        <div>
                                            City:
                                        </div>
                                        <Input
                                            required
                                            name="city"
                                            value={city}
                                            onChange={(e) => setCity(e.target.value)}
                                        />
                                    </div>
                                    <br />
                                    <div className={styles.inputWrapper}>
                                        <div>
                                            PostCode:
                                        </div>
                                        <Input
                                            required
                                            name="postCode"
                                            value={postCode}
                                            onChange={(e) => setPostCode(e.target.value)}
                                        />
                                    </div>
                                    <br />
                                    <div className={styles.inputWrapper}>
                                        <div>
                                            Mobile:
                                        </div>
                                        <Input
                                            required
                                            name="mobile"
                                            value={mobile}
                                            onChange={(e) => setMobile(e.target.value)}
                                        />
                                    </div>
                                    <br />
                                    <div className={styles.inputWrapper}>
                                        <Button type="submit" >
                                            { isLoading && <CircularProgress size={20} color="inherit" /> }
                                            { !isLoading && 'PLACE ORDER'}
                                        </Button>
                                    </div>
                                </form>
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
                                <h2>COLLECTION</h2>
                            </div>
                            <div className={styles.totalBody}>
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
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                                <div className={styles.subTotal}>
                                    <h4>Sub-total</h4>
                                    <p>{sum}</p>
                                </div>
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
