const Express = require("express");
const Mongoose = require("mongoose");
const Bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");
const Schema_Page = require("./Schema/Schema");
const cors = require("cors")
const dotenv = require("dotenv");
const router = require("./Router/router");
dotenv.config()

const App = Express();

App.use(cors())
App.use(Express.json());
App.use("/route", router)

Mongoose.connect(process.env.DataBase)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));



    Mongoose
    .connect(process.env.DataBase, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        await createDefaultAdmin(); // Ensure admin user exists on server startup
        console.log("DB is connect")
    })
    .catch((err) => console.error("Database connection failed:", err));


// Middleware to verify token
function VerifyToken(req, res, next) {
    const token = req.headers["authorization"];
    if (!token) {
        return res.status(403).send("Token not found");
    }


    const TokenAllowed = token.split(" ")[1];
    try {
        const decoded = Jwt.verify(TokenAllowed, "ragasiyam");
        req.user = decoded; // Extract email and role

        next();
    } catch (err) {
        res.status(403).send("Invalid Token");
    }
}


// Call the function to ensure admin creation on server start

// Route to create new user data

const createDefaultAdmin = async () => {
    const adminExists = await Schema_Page.findOne({ email: process.env.Email });
    if (!adminExists) {
        const hashedPassword = await Bcrypt.hash(process.env.AdminPass, 10);
        const adminUser = new Schema_Page({
            name: process.env.Name,
            email: process.env.Email,
            password: hashedPassword,
            role: process.env.Role,
        });
        await adminUser.save();
        console.log("Default admin user created");
    } else {
        console.log("Admin user already exists");
    }
};

// POST /postdata route
App.post("/postdata", async (req, res) => {
    try {
        // Hash the password
        const hashedPassword = await Bcrypt.hash(req.body.password, 10);
        // Check if the email already exists
        const emailExists = await Schema_Page.findOne({ email: req.body.email });
        if (emailExists) {
            return res.status(409).send("Email already exists");
        }

        // Save the new user data
        const Post_data = new Schema_Page({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            role: req.body.role || "user", // Default to "user" if no role provided
        });

        const savedData = await Post_data.save();
        res.status(201).json({ savedData, msg: "Data is created" });
    } catch (error) {
        res.status(500).send("An error occurred: " + error.message);
    }
});
// Route to fetch data (admin-only)
App.get("/getdata", VerifyToken, async (req, res) => {


    if (req.user.role !== "admin") {
        return res.status(403).json("Only admins can access this route");
    }


    const Get_data = await Schema_Page.find();
    res.json({ Get_data, msg: "Data is fetched" });
});


// Route to handle login
App.post("/login", async (req, res) => {
    const User_email = await Schema_Page.findOne({ email: req.body.email });


    if (!User_email) {
        return res.status(404).send("Email not found");
    }


    const User_password = await Bcrypt.compare(req.body.password, User_email.password);
    if (!User_password) {
        return res.status(401).send("Password not found");
    }


    const token = Jwt.sign(
        { email: User_email.email, role: User_email.role }, // Use role from the database
        "ragasiyam",
        { expiresIn: "1h" }
    );


    res.json({ token, msg: "Login Successfully" });
});


// Start the server
App.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}` );
});



