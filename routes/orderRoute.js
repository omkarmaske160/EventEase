
const { placeOrders, initiatePayment } = require("../controller/orderPlaceController")

const orderRouter = require("express").Router()
orderRouter
    .post("/place-order", placeOrders)
    .post("/initiate-order", initiatePayment)

module.exports = orderRouter