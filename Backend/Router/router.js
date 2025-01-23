const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const User = require("../Schema/UserDataSchema"); // Adjust path as necessary

// Configure Multer for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, "../../frontend/src/images");

       
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); // Ensure unique filenames
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // Limit file size to 2MB
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png/;
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = fileTypes.test(file.mimetype);

        if (extname && mimetype) {
            return cb(null, true);
        } else {
            cb(new Error("Only .jpg, .jpeg, and .png files are allowed"));
        }
    }
});

// Create a new user with image upload
router.post("/postdata", upload.single("image"), async (req, res) => {
    try {
        const { firstname, lastname, role, dob, gender, email, mobile, city, state } = req.body;
        const imagePath = req.file ? req.file.path : null;

        const user = new User({
            firstname,
            lastname,
            role,
            dob,
            gender,
            email,
            mobile,
            city,
            state,
            image: imagePath
        });
 
 const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) {
        return res.status(409).send("Email already exists");
    }
        const savedUser = await user.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all users
router.get("/getData", async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a single user by ID
router.get("/getData/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a user with image replacement
router.put("/updateData/:id", upload.single("image"), async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const { firstname, lastname, role, dob, gender, email, mobile, city, state } = req.body;
        const newImagePath = req.file ? req.file.path : user.image;

        // Delete the old image if a new one is uploaded
        if (req.file && user.image) {
            fs.unlinkSync(user.image);
        }

        user.firstname = firstname || user.firstname;
        user.lastname = lastname || user.lastname;
        user.role = role || user.role;
        user.dob = dob || user.dob;
        user.gender = gender || user.gender;
        user.email = email || user.email;
        user.mobile = mobile || user.mobile;
        user.city = city || user.city;
        user.state = state || user.state;
        user.image = newImagePath || user.image;
        user.updated_at = Date.now();

        const updatedUser = await user.save();
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a user and their image
router.delete("/DeleteData/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Delete the user's image from the filesystem
        if (user.image) {
            fs.unlinkSync(user.image);
        }

        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "User and their image deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
