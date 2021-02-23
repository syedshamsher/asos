import React from 'react'
import styles from './style.module.css'
import styled from "styled-components"
import { useDispatch } from "react-redux"
import { contactUser } from '../../Redux/Contact/actions';
import { CircularProgress } from '@material-ui/core';
// import { Button } from '@material-ui/core';

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

const Message = styled.input`
  font-size: 18px;
  width: 80%;
  height: 100px;
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
export const ContactUs = () => {

    const [email, setEmail] = React.useState("")
    const [firstname, setFirstName] = React.useState("")
    const [lastname, setLastName] = React.useState("")
    const [location, setLocation] = React.useState("")
    const [message, setMessage] = React.useState("")
    const [isLoading, setIsLoading] = React.useState(false)
    const dispatch = useDispatch()

    React.useEffect(() => {
        window.scrollTo(0, 0);
    },[])

    const handleContactRequest = (e) => {
        setIsLoading( true )
        e.preventDefault();
        const userDetail = {
            first_name: firstname,
            last_name: lastname,
            email: email,
            location: location,
            message: message
        }
        dispatch(contactUser(userDetail))
        setFirstName("")
        setLastName("")
        setEmail("")
        setLocation("")
        setMessage("")
        setTimeout(() => setIsLoading(false), 2000)
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.heading}>
                <h1>SEND US AN EMAIL</h1>
                <p>We’re here 7 days a week to help you. We’ll get back to you as soon as we can.</p>
            </div>
            <form onSubmit={handleContactRequest} className={styles.form}>
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
                                LOCATION:
                            </div>
                            <Input
                                name="location"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            />
                        </div>
                        <br />
                        <div className={styles.inputWrapper}>
                            <div>
                                MESSAGE:
                            </div>
                            <Message
                                name="message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                        </div>
                        <br />
                        <div className={styles.inputWrapperBtn}>
                            <Button type="submit" >
                                { isLoading && <CircularProgress size={20} color="white" /> }
                                { !isLoading && 'SEND'}
                            </Button>
                        </div>
                    </form>
        </div>
    )
}
