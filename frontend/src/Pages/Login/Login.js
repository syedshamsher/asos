import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { loginUser } from "../../Redux/Auth/actions"
import styles from './style.module.css'
import styled from "styled-components"
import { registerUser } from "../../Redux/Register/actions"
import { Redirect } from "react-router-dom"
import { useHistory } from 'react-router-dom';
import { CircularProgress } from "@material-ui/core"
import Alert from '@material-ui/lab/Alert';
import { loadData } from "../../Utils/LocalStorage"

const Input = styled.input`
  font-size: 18px;
  width: 80%;
  height: 50px;
  margin: 1px;
  background: white;
  border: 0.1px solid black;
  ::placeholder {
    color: grey;
  }
`;

const Button = styled.button`
    width: 82%;
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

const Login = () => {
    const dispatch = useDispatch()
    const isLoading = useSelector((state) => state.auth.isLoading)
    const error = useSelector((state) => state.auth.error)
    const isRegister = useSelector((state) => state.register.isRegister)
    const regError = useSelector((state) => state.register.error)
    const regIsLoading = useSelector((state) => state.register.isLoading)
    const token = useSelector((state) => state.auth.token)
    const [type, setType] = React.useState(true)
    const [email, setEmail] = React.useState("")
    const [firstname, setFirstName] = React.useState("")
    const [lastname, setLastName] = React.useState("")
    const [regPassword, setRegPassword] = React.useState("")
    const [loginEmail, setLoginEmail] = React.useState("")
    const [loginPassword, setLoginPassword] = React.useState("")
    const [loading, setLoading] = React.useState(false)

    const history = useHistory()

    const handleSubmit = async(e) => {
        e.preventDefault()
        const loginDetails = {
            "email": loginEmail,
            "password": loginPassword
        }
        await dispatch(loginUser(JSON.stringify(loginDetails)))
        setLoginEmail("")
        setLoginPassword("")
        token && history.push(`./user/profile`)
    }

    
    const handleRegSubmit = (e) => {
        setLoading(true)
        e.preventDefault();
        const userDetail = {
            first_name: firstname,
            last_name: lastname,
            email: email,
            password: regPassword
        }
        dispatch(registerUser(userDetail))
        setFirstName("")
        setLastName("")
        setEmail("")
        setRegPassword("")
        if( isRegister ) {
            setTimeout(() => setLoading(false), 2000)
            setTimeout(() => setType(true), 3000)
        }
    }

    return (
        <div className={styles.wrapper}>
            {
                !token ?
            <div className={styles.login}>
                <div className={styles.typeHeader}>
                    <div className={styles.loginBtn} onClick={() => setType(true)}>
                        ALREADY REGISTERED?
                    </div>
                    <div className={styles.registerBtn} onClick={() => setType(false)}>
                        NEW TO ASOS?
                    </div>
                </div>
                {
                    type ?     
                    (<form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.inputWrapper}>
                            <div>
                                Email:
                            </div>
                            <Input
                                name="loginEmail"
                                value={loginEmail}
                                onChange={(e) => setLoginEmail(e.target.value)}
                            />
                        </div>
                        <br />
                        <div className={styles.inputWrapper}>
                            <div>
                                Password:
                            </div>
                            <Input
                                name="loginPassword"
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}
                            />
                        </div>
                        <br />
                        <div className={styles.inputWrapper}>
                            <Button type="submit" >
                                { isLoading && <CircularProgress size={20} color="inherit" /> }
                                { !isLoading && 'SUBMIT'}
                            </Button>
                        </div>
                            {!isLoading && error && (
                                <Alert variant="filled" severity="error" style={{height: '18px', display: 'flex', alignItems: 'center', fontSize:13}}>
                                    {error.data}
                                </Alert>
                            )}
                    </form>) : 

                    (<form onSubmit={handleRegSubmit} className={styles.form}>
                        <div className={styles.inputWrapper}>
                            <div>
                                EMAIL ADDRESS:
                            </div>
                            <Input
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <br />
                        <div className={styles.inputWrapper}>
                            <div>
                                FIRST NAME:
                            </div>
                            <Input
                                name="firstname"
                                value={firstname}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>
                        <br />
                        <div className={styles.inputWrapper}>
                            <div>
                                LAST NAME:
                            </div>
                            <Input
                                name="lastname"
                                value={lastname}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                        <br />
                        <div className={styles.inputWrapper}>
                            <div>
                                PASSWORD:
                            </div>
                            <Input
                                name="regPassword"
                                value={regPassword}
                                onChange={(e) => setRegPassword(e.target.value)}
                            />
                        </div>
                        <br />
                        <div className={styles.inputWrapper}>
                            <Button type="submit" > 
                                { regIsLoading && <CircularProgress size={20} color="inherit" /> }
                                { !regIsLoading && 'JOIN ASOS'}
                            </Button>
                        </div>
                        { isRegister && <Alert variant="filled" severity="success">
                                                Successfully registered
                                        </Alert>}
                        {!regIsLoading && regError && (
                            <Alert variant="filled" severity="error" style={{height: '18px', display: 'flex', alignItems: 'center', fontSize:13}}>
                                 {regError.data}
                            </Alert>
                        )}
                    </form>)
                }
            </div> : 
            <Redirect to='/user/profile' />
            }
        </div>
    )
}

export  {Login}
