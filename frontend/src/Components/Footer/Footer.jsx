import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from "./Footer.module.css"
import styled from "styled-components"

const FooterWrapper = styled.footer`
  padding-top: 15px;
  padding-bottom: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  text-align: left;
  color: grey;
  a {
    text-decoration: none;
    color: grey;
  }
`

const linksForHelp = [
    {
      title: "Help",
      to: "/help",
    },
    {
        title: "Track Order",
        to: "/track-order", 
    },
    {
        title: "Delivery & Returns",
        to: "/delivery-returns", 
    }
  ]

const linksForAbout = [
    {
      title: "About Us",
      to: "/about-us",
    },
    {
        title: "Contact Us",
        to: "/contact", 
    },
    {
        title: "Corporate Responsibility",
        to: "/corporate", 
    },
    {
        title: "Investors Site",
        to: "/investors", 
    }
  ]

const linksForMoreOptions = [
    {
      title: "Mobile and ASOS Apps",
      to: "/apps",
    },
    {
        title: "ASOS Marketplace",
        to: "/marketplace", 
    },
    {
        title: "Gift vouchers",
        to: "/gift-vouchers", 
    },
    {
        title: "Black Friday",
        to: "/black-friday", 
    }
  ]

function Footer() {
    return (
        <>
            <div className={styles.mediaAndPayment}>
                        <div style={{display:'flex', justifyContent: 'flex-end'}}>
                            <div className={styles.media}>
                                <img src="https://cdn3.iconfinder.com/data/icons/free-social-icons/67/facebook_circle_color-512.png" alt="social media " width="30px"/>
                                <img src="https://cdn3.iconfinder.com/data/icons/2018-social-media-logotypes/1000/2018_social_media_popular_app_logo_snapchat-512.png" alt="social media " width="30px"/>
                                <img src="https://cdn3.iconfinder.com/data/icons/2018-social-media-logotypes/1000/2018_social_media_popular_app_logo_instagram-256.png" alt="social media " width="30px"/>
                            </div>
                        </div>
                        <div style={{display:'flex', justifyContent: 'flex-start'}}>
                            <div className={styles.payment}>
                                <img src="https://images.asos-media.com/navigation/visa-png" alt="visa" width="40px"/>
                                <img src="https://images.asos-media.com/navigation/mastercard-png" alt="mastercard" width="40px"/>
                                <img src="https://images.asos-media.com/navigation/pay-pal-png" alt="paypal" width="40px"/>
                                <img src="https://images.asos-media.com/navigation/american-express-png" alt="americanexpress" width="40px"/>
                                <img src="https://images.asos-media.com/navigation/visa-electron-png" alt="visaelectron" width="40px"/>
                            </div>
                        </div>
                            
            </div>

            <div className={styles.footer}>
                            <FooterWrapper>
                                <h5>HELP &amp; INFORMATION</h5>
                                {
                                    linksForHelp.map((link, i) => <NavLink 
                                                                key={i} 
                                                                to={link.to}
                                                                exact
                                                                activeStyle={{padding: 10, color: "#d01345"}} >
                                                                {link.title }
                                                            </NavLink> )
                                }
                            </FooterWrapper>
                            <FooterWrapper>
                                <h5>ABOUT ASOS</h5>

                                {
                                    linksForAbout.map((link, i) => <NavLink 
                                                                key={i} 
                                                                to={link.to}
                                                                exact
                                                                activeStyle={{padding: 10, color: "#d01345"}} >
                                                                {link.title }
                                                            </NavLink> )
                                }
                            </FooterWrapper>
                            <FooterWrapper>
                                <h5>MORE FROM ASOS</h5>
                                {
                                    linksForMoreOptions.map((link, i) => <NavLink 
                                                                key={i} 
                                                                to={link.to}
                                                                exact
                                                                activeStyle={{padding: 10, color: "#d01345"}} >
                                                                {link.title }
                                                            </NavLink> )
                                }
                            </FooterWrapper>
            </div>
        </>
        
        
    )
}

export { Footer }