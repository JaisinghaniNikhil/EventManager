const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const signup = async( req, res ) => {
    const { name, email, password } = req.body;

    try{
        const existinguser = await User.findOne({ email });
        if(existinguser) return res.status(400).json({ message: 'User Already Exists'});

        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = await User.create({ name, email, password: hashedPassword});

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '7d'});

        res.json({ token, name: newUser.name });

    }
    catch(err)
    {
        res.status(500).json({message:'Signup Failed', error: err.message});
    }
};

module.exports = signup;