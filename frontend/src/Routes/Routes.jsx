import React from 'react'
import { Switch, Route } from "react-router-dom";
import { Navbar } from "../Components/Navbar"
import { Footer } from "../Components/Footer"
import { Home } from '../Pages/Home/Home';
import { Login } from '../Pages/Login';
import { MenProducts } from '../Pages/MenProducts/MenProducts';
import { WomenProducts } from '../Pages/WomenProducts/WomenProducts';
import { ViewProduct } from '../Pages/ViewProduct';
import {Cart} from '../Pages/Cart/Cart';
import { useDispatch} from 'react-redux';
import { ContactUs } from '../Pages/ContactUs/ContactUs';
import { Profile } from '../Pages/ProfilePage';
import { loginSuccess } from '../Redux/Auth/actions';
import { loadData } from '../Utils/LocalStorage';
import { Checkout } from '../Pages/Checkout/Checkout';
import { Searched } from '../Pages/Searched/Searched';

function Routes() {
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(loginSuccess(loadData('token')))
    },[])

    return (
        <div>
            <Route path="/" render={() => <Navbar/>} />
            <Switch>
                <Route path="/" exact render={() => <Home/> } />
                <Route path="/auth" exact render={() => <Login/> } />
                <Route path="/user/profile" exact render={() => <Profile />} />
                <Route path="/men" exact render={() => <MenProducts />} />
                <Route path="/women" exact render={() => <WomenProducts />} />
                <Route path="/query" exact render={() => <Searched />} />
                <Route path="/men/:product_id" exact render={() => <ViewProduct />} />
                <Route path="/women/:product_id" exact render={() => <ViewProduct />} />
                <Route path="/cart" exact render={() => <Cart />} />
                <Route path="/contact" exact render={() => <ContactUs />} />
                <Route path="/cart/checkout" exact render={() => <Checkout />} />
            </Switch>
            <Route path="/" render={() => <Footer /> } />
        </div>
    )
}

export { Routes }


