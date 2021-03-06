import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import styled from "styled-components"
import styles from "./style.module.css"
import "./style.module.css"
import { useHistory } from "react-router-dom";
import { useSelector} from 'react-redux';

const Top = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;

`

const NavbarWrapper = styled.header`
  background: #333333;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  a {
    text-decoration: none;
    color: whitesmoke;
  }
`

const SubNav = styled.header`
  padding-top: 5px;
  padding-bottom: 5px;
  background: #525050;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  color: whitesmoke;
  justify-content: space-around;
  a {
    text-decoration: none;
    color: whitesmoke;
  }
`
const Input = styled.input`
  width: 380px;
  color: palevioletred;
  font-size: 1em;
  padding-left: 20px;
  border: none;
  border-radius: none;
  outline: none;
  height: 30px;

`

const Search = styled.button `
    width: 100px;
    color: #525050;
    font-size: 1em;
    border: none;
    border-radius: none;
    outline: none;
    height: 30px;
    background-color: #ddd
`

const SearchContainer = styled.div `
  padding-top: 5px;
  padding-bottom: 5px;
  background: #525050;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  color: whitesmoke;
  justify-content: center;
  
    button {
      margin-left: 10px
    }
`

const SubOption = styled.div`
    color: white;
    width: 100px;
    font-size: 12px;
    cursor: pointer;
    &:hover {
      width: 100px;
      font-weight: 800;
      background-color: #d01345;
      transform: skew(-12deg);
    }
`

const links = [
    {
      title: "HOME",
      to: "/",
    },
    {
        title: "MEN",
        to: "/men", 
    },
    {
        title: "WOMEN",
        to: "/women", 
    },
    {
      title: "LOGIN",
      to: "/auth",
    },
    {
      title: "SEARCH",
      to: "/query",
    },
    {
      title: "CART",
      to: "/cart"
    }
  ]

const loggedInLinks = [
  {
    title: "HOME",
    to: "/",
  },
  {
      title: "MEN",
      to: "/men", 
  },
  {
      title: "WOMEN",
      to: "/women", 
  },
  {
    title: "PROFILE",
    to: "/user/profile",
  },
  {
    title: "SEARCH",
    to: "/query",
  },
  {
    title: "CART",
    to: "/cart"
  }
]
function Navbar() {
  let history = useHistory()
  const token = useSelector(state => state.auth.token)

    return (
      <>
        <Top>
          <div className={styles.top} >Marketplace</div>
          <div className={styles.top} >Help &amp; FAQs</div>
          <div className={styles.top} >India</div>
        </Top>
        <NavbarWrapper className={styles.navBar}>
            <div className={styles.asosWrapper} >
                <Link to="/" >
                  <h1 className={styles.asos} >asos</h1>
                </Link>
            </div>
        
        {
          !token ? 
            links.map((link, i) => <NavLink 
                                        key={i} 
                                        to={link.to}
                                        exact
                                        activeStyle={{
                                                      padding: "12px 14px 12px 14px",
                                                      fontWeight: 800,
                                                      backgroundColor: "#525050",
                                                      }} >
                                        {link.title }
                                    </NavLink> ) :
            loggedInLinks.map((link, i) => <NavLink 
                                        key={i} 
                                        to={link.to}
                                        exact
                                        activeStyle={{
                                                      padding: "12px 14px 12px 14px",
                                                      fontWeight: 800,
                                                      backgroundColor: "#525050",
                                                      }} >
                                        {link.title }
                                    </NavLink> )
        }
        
        </NavbarWrapper>
        {
          history.location.pathname === "/men"  &&
          <SubNav>
              <SubOption >Clothing</SubOption>
              <SubOption >Shoes</SubOption>
              <SubOption >Accessories</SubOption>
              <SubOption >Face+Body</SubOption>
          </SubNav> 
        }
        {
          history.location.pathname === "/women" &&
          <SubNav>
              <SubOption >Clothing</SubOption>
              <SubOption >Shoes</SubOption>
              <SubOption >Accessories</SubOption>
              <SubOption >Face+Body</SubOption>
          </SubNav>
        }
        {
          history.location.pathname === "/query" &&
          <SearchContainer style={{height:"40px"}}>
              <Input type="text" placeholder="Search" />
              <Search >Search</Search>
          </SearchContainer>
        }
        {
          history.location.pathname === "/" &&
          <SubNav>
              <SubOption >Sale</SubOption>
              <SubOption >New in</SubOption>
              <SubOption >Trending</SubOption>
              <SubOption >Brands</SubOption>
          </SubNav>
        }
       
      </>
    )
}

export { Navbar }