const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app =new express();
app.use(cors());
app.use(bodyParser.json()); 

delete require.cache[require.resolve('./signup.model')];
let New_user = require('./signup.model');
let Cart_item=require('./cart.model');
let New_user1=require('./login.model');
let cart=require('./cart.model')

mongoose.connect("mongodb+srv://swetha27112003:ICQtEWyI3RAMiF9H@rest-db.k6ifsg0.mongodb.net/?retryWrites=true&w=majority&appName=rest-db");

const connection=mongoose.connection;
connection.once("open",()=>{
    console.log("MongoDB connection established successfully");
})

app.get("/",(req,res)=>{
    console.log("request received")
    res.json("Hello World")
});

app.get("/hi",(req,res)=>{
    console.log("Hi,request received")
    res.json("welcome")
});

app.get("/cart", async (req, res) => {
    console.log("Cart request received");
    try {
        let data = await Cart_item.find();
        console.log(data);
        res.json(data); 
    } catch (err) {
        console.error("Error loading cart data:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


app.post("/cart",(req,res)=>{
    console.log(req.body);
    let cart = new Cart_item(req.body);
    cart.save().then(()=>{
        console.log("Data added to the database");
        res.json("Saved successfully");
    }).catch(err=>{
        res.json("Error:" + err);
    });
});

app.get('/cart/check/:title', async (req, res) => {
    const title= req.params.title;
    console.log(title);
    const item = await Cart_item.findOne({ title:title });
    if (item) {
        console.log(item)
        res.json({ exists: true, quantity: item.quantity });
    } else {
        res.json({ exists: false });
    }
});

app.put('/cart/update', async (req, res) => {
    const { title, quantity } = req.body;
    const updatedItem = await Cart_item.findOneAndUpdate({ title: title }, { $set: { quantity: quantity }}, { new: true });
    if (updatedItem) {
        res.json({ message: "Quantity updated successfully", item: updatedItem });
    } else {
        res.status(404).json({ message: "Item not found" });
    }
});

app.get("/signup", async (req, res) => {
        console.log("signup request received");
        try {
            let signup_data = await New_user.find();
            res.json(signup_data); 
        } catch (err) {
            console.error("Error loading signup data:", err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

app.post("/signup",(req,res)=>{
    console.log(req.body);
    let signup_data = new New_user(req.body);
    signup_data.save().then(()=>{
        res.json("Saved successfully");
    }).catch(err=>{
        res.json("Error:" + err);
    });
});


app.get("/login", async (req, res) => {
        console.log("login request received");
        try {
            let login_data = await New_login.find();
            res.json(login_data);
        } catch (err) {
            console.error("Error loading login data:", err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
    
    app.post("/login", async (req, res) => {
            console.log("Received data:", req.body); 

            
            try {
                const { username, password } = req.body;
                console.log(username,password); 
                const user = await New_user1.findOne({ username: username }).exec();
        
                if (!user) {
                    return res.status(404).json({ message: "User not found" });
                }
        
                if (user.password === password) {
                        console.log("Login successful");
                        res.json({ message: "Login successful"});
        
                } else {
                    res.status(401).json({ message: "Invalid username or password" });
                }
            } catch (err) {
                console.error("Login error:", err);
                res.status(500).json({ message: "Server error: " + err });
            }
        });


        app.delete("/cart/:id", async (req, res) => {
                const id = req.params.id;
            
                try {
                    const deletedItem = await Cart_item.findByIdAndDelete(id);
                    if (!deletedItem) {
                        return res.status(404).json({ message: "Item not found" });
                    }
                    res.json({ message: "Data removed successfully", item: deletedItem });
                } catch (err) {
                    console.error("Error deleting cart item:", err);
                    res.status(500).json({ error: "Failed deleting data" });
                }
            });


          



app.get("/cart", async (req, res) => {
    console.log("cart data received");
    try {
        let cart_data = await cart_data.find();
        res.json(cart_data); 
    } catch (err) {
        console.error("Error loading cart data:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post("/cart",(req,res)=>{
console.log(req.body);
let cart = new Cart_item (req.body);
cart.save().then(()=>{
    res.json("Saved successfully");
}).catch(err=>{
    res.json("Error:" + err);
});
});



app.get("/feedback", async (req, res) => {
    console.log("feedback request received");
    try {
        let feedback_data = await New_feedback.find();
        res.json(feedback_data); 
    } catch (err) {
        console.error("Error loading feedback data:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


app.post("/feedback",(req,res)=>{
    console.log(req.body);
    let feedback = new New_feedback(req.body);
    feedback.save().then(()=>{
        console.log("Feedback Data added to the database");
        res.json("Saved successfully");
    }).catch(err=>{
        res.json("Error:" + err);
    });
});

app.post("/order/place",(req,res)=>{
    console.log(req.body);
    let order = new Order_item(req.body);
    order.save().then(()=>{
        console.log("Feedback Data added to the database");
        res.json("Saved successfully");
    }).catch(err=>{
        res.json("Error:" + err);
    });
});

app.get("/order", async (req, res) => {
    console.log("order request received");
    try {
        let order_data = await Order_item.find();
        res.json(order_data);
    } catch (err) {
        console.error("Error loading order data:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get("/add", async (req, res) => {
    console.log("Add request received");
    try {
        let add_data = await Add_item.find();
        res.json(add_data); 
    } catch (err) {
        console.error("Error loading added data:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


app.post("/add",(req,res)=>{
    console.log(req.body);
    let added_item = new Add_item(req.body);
    added_item.save().then(()=>{
        console.log("Added Data added to the database");
        res.json("Saved successfully");
    }).catch(err=>{
        res.json("Error:" + err);
    });
});

app.delete("/add/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const deleteItem = await Add_item.findByIdAndDelete(id);
        if (!deleteItem) {
            return res.status(404).json({ message: "Item not found" });
        }
        res.json({ message: "Data removed successfully", item: deleteItem });
    } catch (err) {
        console.error("Error deleting menu item:", err);
        res.status(500).json({ error: "Failed deleting data" });
    }
});



app.listen("3001", ()=>{
    console.log("Started server on 3001");
})






