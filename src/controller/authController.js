const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');

//fitur singup
exports.signup = async (req, res) => {
    const { username, password } = req.body;

    // Cek apakah username sudah digunakan
    const existingUser = await userModel.findUserByUsername(username);
    if (existingUser) {
        return res.status(400).json({ message: "Username already taken" });
    }

    // Enkripsi password
    const hashedPassword = await bcrypt.hash(password, 10);  // 10 adalah jumlah salt rounds

    // Simpan user ke Firestore
    const user = { username, password: hashedPassword };
    const userId = await userModel.addUser(user);

    res.status(201).json({ message: "Signup successful", userId });
};

//fitur login
exports.login = async (req, res) => {
    const { username, password } = req.body;

    // Mencari pengguna berdasarkan username di Firestore
    const user = await userModel.findUserByUsername(username);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    // Verifikasi password dengan bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid password" });
    }

    res.json({ message: "Login successful" });
};