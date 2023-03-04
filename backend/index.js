const express = require('express');
require('./db/config');
const User = require("./db/User");
const Product = require("./db/Product");
const cors = require("cors");
// const mongoose = require('mongoose');
const app = express();
app.use(express.json());
app.use(cors());

app.post("/register", async (req, res) => {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password
    res.send(result)
})
app.post("/login", async (req, res) => {
    console.log(req.body)
    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select("-password");
        if (user) {
            res.send(user);
        }
        else {
            res.send({ result: "No User Found" })
        }
    }
    else {
        res.send({ result: "No User Found" })
    }

})

app.post("/addProduct", async (req, res) => {
    let product = new Product(req.body);
    let result = await product.save();
    res.send(result)
})

app.get("/products", async (req, res) => {
    let products = await Product.find();
    if (products.length > 0) {
        res.send(products);
    }
    else {
        res.send({ result: "No products Found" })
    }
})
app.delete("/product/:id", async (req, res) => {
    const result = await Product.deleteOne({ _id: req.params.id })
    res.send(result);
});
//update ke liye particular id k data ko get krne k liye 
app.get("/product/:id", async (req, res) => {
    let result = await Product.findOne({ _id: req.params.id });
    if (result) {
        res.send(result);
    }
    else {
        res.send({ result: "No Records" })
    }
});

app.put("/product/:id", async (req, res) => {
    let result = await Product.updateOne(
        { _id: req.params.id }, {
        $set: req.body
    })
    res.send(result);
})
//search
app.get("/search/:key", async (req, res) => {
    let result = await Product.find({
        "$or": [
            { name: { $regex: req.params.key } },
            { company: { $regex: req.params.key } },
            { category: { $regex: req.params.key } }
        ]
    })
    res.send(result)
})


//static database connect not for api
// const URI= 'mongodb+srv://hmseverus19:manassingh@cluster0.t0knrdv.mongodb.net/e-comm?retryWrites=true&w=majority';
// const connectDB = async () => {
// mongoose.connect(URI);
// const productSchema=new mongoose.Schema({});
// const product =mongoose.model('product',productSchema);
// const data=await product.find();
// console.warn(data);
// }
// connectDB();


app.listen(5000);