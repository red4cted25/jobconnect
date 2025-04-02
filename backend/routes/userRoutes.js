const express = require("express");
const router = express.Router();
const User = require("../models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { cloudinary } = require("../utils/CloudinaryConfig.js");
const { authenticateToken } = require("../middleware/authenticateToken.js");

/**
 * GET /users/settings => fetch current user settings
 * Uses req.user.id from authenticateToken middleware.
 */
router.get("/settings", authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });
        return res.status(200).json(user);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
    });

/**
 * PATCH /users/update => update current user settings
 * Expects a JSON object with the fields to update.
 * If updating password, it will be hashed before saving.
 */
router.patch("/update", authenticateToken, async (req, res) => {
    try {
        const updates = req.body;
        // If password update is included, hash the new password
        if (updates.password) {
        const salt = await bcrypt.genSalt(10);
        updates.password = await bcrypt.hash(updates.password, salt);
        }
        const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true }).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });
        return res.status(200).json(user);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
});

/**
 * GET /users/:id => fetch user data
 * Only the owner (matching userId) can see their data.
 */
router.get("/:id", authenticateToken, async (req, res) => {
    try {
        if (req.params.id !== req.user.id) {
        return res.status(403).json({ message: "Forbidden" });
        }

        const user = await User.findById(req.params.id).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });

        return res.status(200).json(user);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
});

/**
 * POST /users/:id/uploadProfile => upload profile picture to Cloudinary
 * Expects { base64Image } in the request body
 */
router.post("/:id/uploadProfile", authenticateToken, async (req, res) => {
    try {
        if (req.params.id !== req.user.id) {
        return res.status(403).json({ message: "Forbidden" });
        }

        const { base64Image } = req.body;
        if (!base64Image) {
        return res.status(400).json({ message: "No image provided" });
        }

        // Upload to Cloudinary
        const uploadResponse = await cloudinary.uploader.upload(base64Image, {
        folder: "jolt_profile_pics",
        public_id: `profile_${req.user.id}_${Date.now()}`,
        overwrite: true
        });

        // Update user's profilePicture with Cloudinary URL
        const user = await User.findByIdAndUpdate(
        req.params.id,
        { profilePicture: uploadResponse.secure_url },
        { new: true }
        ).select("-password");

        return res.status(200).json({
        message: "Profile picture uploaded",
        profilePicture: user.profilePicture
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
});

/**
 * POST /users/:id/uploadBanner => upload banner to Cloudinary
 * Expects { base64Image } in the request body
 */
router.post("/:id/uploadBanner", authenticateToken, async (req, res) => {
    try {
        if (req.params.id !== req.user.id) {
        return res.status(403).json({ message: "Forbidden" });
        }

        const { base64Image } = req.body;
        if (!base64Image) {
        return res.status(400).json({ message: "No image provided" });
        }

        const uploadResponse = await cloudinary.uploader.upload(base64Image, {
        folder: "jolt_banner_pics",
        public_id: `banner_${req.user.id}_${Date.now()}`,
        overwrite: true
        });

        // Update user's bannerPicture with the Cloudinary URL
        const user = await User.findByIdAndUpdate(
        req.params.id,
        { bannerPicture: uploadResponse.secure_url },
        { new: true }
        ).select("-password");

        return res.status(200).json({
        message: "Banner uploaded",
        bannerPicture: user.bannerPicture
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
