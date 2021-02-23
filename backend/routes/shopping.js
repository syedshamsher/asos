const express = require("express");

const {  getAllProducts, 
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
         orderCapture } = require('../controller/shopping')
const { authenticateToken } = require('../auth/authenticate')

const router = express.Router();

router.get('/', getAllProducts)

router.get('/men', getMenProducts)

router.get('/women', getWomenProducts)

router.post('/account/register', register)

router.post('/user/profile', authenticate)

router.post('/cart/add', addToCart)

router.post('/cart/delete', removeFromCart)

router.get('/users', authenticateToken, getActiveUsers)

router.get('/cart', authenticateToken, getActiveUserCart)

router.get('/order-details', authenticateToken, getActiveUserOrder)

router.post('/contact', contact)

router.post('/order', orderRequest)

router.post('/capture/:paymentId', orderCapture)

module.exports = router;