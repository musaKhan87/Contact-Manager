const express = require("express");
const Contact = require("../models/Contact");

const router = express.Router();

/* POST - Add Contact */
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ message: "All required fields missing" });
    }

    const newContact = await Contact.create({
      name,
      email,
      phone,
      message,
    });

    res.status(201).json({
      success: true,
      contact: newContact,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* GET - Fetch Contacts */
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* DELETE - Remove Contact (Bonus) */
router.delete("/:id", async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Contact deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
