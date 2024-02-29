
const { placeOrders, initiatePayment, QrChecking } = require("../controller/orderPlaceController")

const orderRouter = require("express").Router()
orderRouter
    .post("/place-order", placeOrders)
    .post("/initiate-order", initiatePayment)
    .post("/qrChecking/:order_id", QrChecking)

module.exports = orderRouter