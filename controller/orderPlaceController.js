const razorpay = require("razorpay")
const { v4: uuid } = require("uuid")
const crypto = require("crypto")
const orderModel = require("../model/orderModel")
const QRCode = require('qrcode');
const sendEmail = require("../util/emailShout");
const fs = require('fs');
const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');


exports.placeOrders = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, email,
            user_name,
            price,
            order_id,
            tiket_count: No_Of_Ticket,
            event_id,
            event_title
        } = req.body;

        const key = `${razorpay_order_id}|${razorpay_payment_id}`;

        // Stringify the req.body object to include all data in the QR code

        const qrCodeData = JSON.stringify({
            scan: false,
            order_id: razorpay_payment_id,
            event_title,
            user_name,
            price,
            No_Of_Ticket,
            event_id,
        });

        // Generate QR code image using the stringified req.body data
        const qrCodeImage = await QRCode.toDataURL(qrCodeData);
        // console.log("QR Code Image Data:", qrCodeImage);

        const x = crypto
            .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY)
            .update(key.toString())
            .digest("hex");

        if (x === razorpay_signature) {
            await orderModel.create({ ...req.body, scan: false, order_id: razorpay_payment_id, isPaid: true });

            const pdfDoc = await PDFDocument.create();
            const page = pdfDoc.addPage();

            // Add content before QR code
            page.drawText('Your Show Ticket', {
                x: 50,
                y: page.getHeight() - 50,
                size: 24,
            });
            page.drawText(`Event Title: ${event_title}`, {
                x: 50,
                y: page.getHeight() - 100,
                size: 18,
            });
            page.drawText(`User Name: ${user_name}`, {
                x: 50,
                y: page.getHeight() - 130,
                size: 18,
            });
            page.drawText(`Price: ${price}`, {
                x: 50,
                y: page.getHeight() - 160,
                size: 18,
            });
            page.drawText(`Number of Tickets: ${No_Of_Ticket}`, {
                x: 50,
                y: page.getHeight() - 190,
                size: 18,
            });
            page.drawText(`Event ID: ${event_id}`, {
                x: 50,
                y: page.getHeight() - 220,
                size: 18,
            });

            const qrImage = await pdfDoc.embedPng(qrCodeImage);
            const { width, height } = qrImage.scale(0.5);
            page.drawImage(qrImage, {
                x: page.getWidth() / 2 - width / 2,
                y: page.getHeight() / 2 - height / 2,
                width: width,
                height: height,
            });

            const pdfBytes = await pdfDoc.save();

            await sendEmail({
                to: email,
                subject: "Show Ticket",
                html: `
                    <h2>Your Show Ticket</h2>
                    <p>Thank you for booking the show. We hope you will enjoy it.</p>
                    <p>This QR code is your ticket for the event. Please do not share it with anyone else.</p>
                    <p>Event Title: ${event_title}</p>
                    <p>User Name: ${user_name}</p>
                    <p>Price: ${price}</p>
                    <p>Number of Tickets: ${No_Of_Ticket}</p>
                    <p>Event ID: ${event_id}</p>
                    <img src="cid:${qrCodeImage}" alt="QR Code" />
                `,
                attachments: [{
                    filename: 'ticket.pdf',
                    content: pdfBytes,
                    encoding: 'base64',
                }]
            });

            res.status(201).json({
                message: "Order placed successfully"
            });
        } else {
            throw new Error("Signature verification failed");
        }
    } catch (error) {
        console.error("Error placing order:", error);
        res.status(400).json({ message: "Unable to complete your payment. Please get in touch with your bank." });
    }
};

exports.initiatePayment = async (req, res) => {
    try {
        const instance = new razorpay({
            key_id: process.env.RAZORPAY_API_KEY,
            key_secret: process.env.RAZORPAY_SECRET_KEY,

        })
        instance.orders.create({
            amount: req.body.amount * 100,
            currency: "INR",
            receipt: uuid()
        }, (err, order) => {
            if (err) {
                return res.status(500).json({ message: err.message || "unable to process request" })
            }
            res.json({
                message: "initiate success", id: order.id
            })
        })
    } catch (error) {

    }

}
exports.QrChecking = async (req, res) => {
    try {
        const { order_id } = req.params;
        console.log(order_id);

        // Find the order in the database
        const order = await orderModel.findOne({ order_id });

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // If the order is found, check if it's already scanned
        if (order.scan === false) {
            // Update scan status to true
            order.scan = true;
            await order.save();

            return res.status(200).json({ message: 'Event scanned successfully', result: order });
        } else {
            return res.status(400).json({ message: 'Event already scanned', result: order });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }

}