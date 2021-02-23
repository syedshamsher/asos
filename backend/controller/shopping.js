const { v4: uuidv4 } = require('uuid');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Razorpay = require('razorpay');
const request = require('request');

const Men = require('../model/men')
const AllProduct = require('../model/allproduct')
const Women = require('../model/women')
const User = require('../model/user')
const Contact = require('../model/contact')
const Cart = require('../model/cart')
const Order = require('../model/order')
const { registerValidation, loginValidation } = require('../validation/validation')

dotenv.config();

//function which authenticates a user
const authenticate = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const { error } = loginValidation(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
        }
        
    const user = await User.findOne({ email: email });
    if (!user) {
        return res.status(400).send("Email is not registered");
    }
    
    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) {
        return res.status(400).send("Invalid password");
    }
    
    if( validPass ) {
        const accessToken = jwt.sign({data: user._id}, process.env.SECRET_KEY, {
            expiresIn: '1d'
        })
        console.log("login token sent")
        res.status(200).json({token: accessToken})
    } else {
        console.log( res )
        res.status(400).json({error: 'wrong password'})
    }
}

//function which fetches all products
const getAllProducts = (req, res) => {
    AllProduct.find()
        .then((allproduct) => res.json(allproduct))
        .catch((err) => res.status(400).json("Error " + err))
}

//function which fetches mens products
const getMenProducts = (req, res) => {
    Men.find()
        .then((men) => res.json(men))
        .catch((err) => res.status(400).json("Error " + err))
}

//function which fetches women products
const getWomenProducts = (req, res) => {
    Women.find()
        .then((women) => res.json(women))
        .catch((err) => res.status(400).json("Error " + err))
}

//function which registers a new user
const register = async (req,res) =>{
    const email = req.body.email;
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const password = req.body.password
    
    const { error } = registerValidation(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

    const emailExists = await User.findOne({ email: email });
        if (emailExists) {
            return res.status(400).send("Email already exists in the database");
        }

    const hashedPassword = await bcrypt.hash(
        password,
        await bcrypt.genSalt(10)
      );

    const user = new User({
        email: email,
        first_name: first_name,
        last_name: last_name,
        password: hashedPassword,
      });

    try {
        const savedUser = await user.save();
        res.send(savedUser);
    } 
    catch (err) {
        res.status(400).send(err);
    }
}

//function which adds an item to user cart
const addToCart = (request,response)=>{
    const user_id = request.body.user_id;
    const newCart = request.body.cart;
    
    Cart.findOne({ user_id: user_id} )
    .then((cart) => {
        console.log( cart )
        if(cart) {
            let arr = cart.cart;
            arr.push( newCart );
            Cart.updateOne({user_id : user_id} , {cart: arr})
            .then(() => console.log("done"))
            .catch(() => console.log("notDone"))
            return response.status(200).json(cart);
        } else {
            const newC = new Cart({user_id:user_id,cart:newCart});
            newC.save((err,cart)=>{console.log(cart);  })
                .then(() => res.status(200).json("Cart Created and Item Added Successfully"))
                .catch((err) => res.status(400).json("Error :" + err))
            return response.status(200).json("Updated Successfully");
        }
        })
        .catch((err) => response.status(404).json("Error:" + err)); 

}

//function which removes an item to user cart
const removeFromCart = (request,response)=>{
    const user_id = request.body.user_id;
    const prodId = request.body.prodId
    console.log( prodId )
    
    Cart.findOne({ user_id: user_id} )
    .then((cart) => {
        if(cart) {
            let arr = cart.cart;
            let newCart = arr.filter((item) => {
                return item._id !== prodId
            } );
            Cart.updateOne({user_id : user_id} , {cart: newCart})
                .then(() => console.log("done"))
                .catch(() => console.log("notDone"))
            return response.status(200).json("Updated Successfully");
        } else {
            return response.status(404).json("Error: Something went wrong" );
        }
        })
        .catch((err) => response.status(404).json("Error:" + err)); 

}

//function which fetches all the available user
const getActiveUsers = (req, res) => {
    User.findOne( {_id: req._id.data} )
        .then((user) => res.json(user))
        .catch((err) => res.status(400).json("Error " + err))
}

//function which fetches all the available carts
const getActiveUserCart =  (req, res) => {
    Cart.findOne({user_id: req._id.data})
        .then((cart) => res.json(cart))
        .catch((err) => {
            res.status(400).json("Error " + err)
        })
}

//function which fetches all the available carts
const getActiveUserOrder =  (req, res) => {
    Order.findOne({user_id: req._id.data})
        .then((order) => res.json(order))
        .catch((err) => {
            res.status(400).json("Error " + err)
        })
}

//function which sends email to the user who tries to contact
const contact = (req, res) =>{
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const email = req.body.email;
    const location = req.body.location;
    const message = req.body.message;
    const id = uuidv4();
    let details = { id, first_name, last_name, email, location, message }

    let transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.GMAIL_USERNAME,
            pass: process.env.GMAIL_PASSWORD
        }
    });
    
    let mailOptions = {
        from: process.env.GMAIL_USERNAME,
        to: email,
        subject: "ASOS",
        html: `<!doctype html>
        <html>
          <style>
            .image {
              min-width: 500px;
              width: 50%;
            }
            .imgWrapper {
              width: 100%;
              display: flex;
              flex-wrap: wrap;
            }
            .wrapper {
              display: flex;
              flex-direction: column;
              flex-wrap: nowrap;
              justify-content: center;
              align-items: center;
            }
          </style>
            <body>
              <div class="wrapper">
                <h1>ASOS</h1>
                <div class="imgWrapper" >
                   <img class = "image" src="https://gallery.mailchimp.com/93484a26e61a20442d2134480/images/75a0961e-fb76-4bce-b503-232208b0c0eb.png" />
                </div>
                <h2>Hi, ${first_name}  </h2>
              <h3> Thanks For Reaching ASOS! </h3>
              <h3> We will get in touch with you </h3>
              </div>
            </body>
        </html>`
    };

    Contact.find({email: email})
           .then( data => {
               if( data.length === 0 ) {
                const newContact =new Contact(details)
                      newContact
                            .save()
                            .then(() => {
                                transporter.sendMail(mailOptions, (err, info) => {
                                    if(err) {
                                        console.log(err);
                                    } else {
                                        console.log('Email Sent' + info.response)
                                    }
                                })
                                res.status(200).json("Query Accepted! We Will Reach You Soon")
                            })
                            .catch((err) => res.status(404).json("Error:" + err)); 
               } else {
                    transporter.sendMail(mailOptions, (err, info) => {
                        if(err) {
                            console.log(err);
                        } else {
                            console.log('Email Sent' + info.response)
                        }
                    })
                    res.status(200).json("Query Accepted! We Will Reach You Soon")
               }
           })
           .catch((err) => res.status(404).json("Error:" + err)); 
}

//function which place the order via razorpay
const instance = new Razorpay({
    key_id: process.env.RAZOR_PAY_KEY_ID,
    key_secret: process.env.RAZOR_PAY_KEY_SECRET
})

const orderRequest = (req, res) => {
    try {
        const options = {
            amount: 100 * Number.parseInt(req.body.order.amount),
            currency: 'INR',
            receipt: uuidv4(),
        }
        instance.orders.create(options, (err, order) => {
            if (err) {
                console.log("if errrrrrr", err)
                return res.status(500).json({ message: "Something went wrong" })
            }
            console.log( "post orderrrrrrrrrrrrrrr" ,order)
            return res.status(200).json(order)
        })
    } catch (err) {
        console.log("catch errrrrrr", err)

        return res.status(500).json({
            message: 'Something went wrong'
        })
    }
}

const orderCapture = (req, res) => {
    const user_id = req.body.user_id;
    const newOrder = req.body.order;
    try {
        return request(
            {
                method: "POST",
                url: `https://${process.env.RAZOR_PAY_KEY_ID}:${process.env.RAZOR_PAY_KEY_SECRET}@api.razorpay.com/v1/payments/${req.params.paymentId}/capture`,
                form: {
                    amount: req.body.order.amount,
                    currency: "INR",
                },
            },
            async function (error, response, body) {
                if (error) {
                    return res.status(500).json({
                        message: "Something Went Wrong",
                    });
                }
                Order.findOne({ user_id: user_id} )
                .then((order) => {
                    console.log( order )
                    if(order) {
                        let arr = order.order;
                        arr.push( newOrder );
                        Order.updateOne({user_id : user_id} , {order: arr})
                        .then(() => console.log("done"))
                        .catch(() => console.log("notDone"))
                        return res.status(200).json(order);
                    } else {
                        const newC = new Order({user_id:user_id,order:newOrder});
                        newC.save((err,order)=>{console.log(order);  })
                            .then(() => res.status(200).json("Order created and placed Successfully"))
                            .catch((err) => res.status(400).json("Error :" + err))
                        return res.status(200).json("Updated Successfully");
                    }
                    })
                    .catch((err) => response.status(404).json("Error:" + err)); 
            });
    } catch (err) {
        return res.status(500).json({
            message: "Something Went Wrong",
        });
    }
};



module.exports = { getAllProducts, 
                   getMenProducts, 
                   getWomenProducts, 
                   register, 
                   authenticate, 
                   addToCart, 
                   removeFromCart, 
                   getActiveUsers, 
                   getActiveUserCart,
                   getActiveUserOrder,
                   contact, 
                   orderRequest, 
                   orderCapture,
                }