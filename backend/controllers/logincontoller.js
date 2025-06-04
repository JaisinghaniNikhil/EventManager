const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const login = async( req, res ) => {
    const { email, password } = req.body;

    try{
        const user = await User.findOne({ email });
    if(!user) return res.status(400).json({ message:'User Not Found'});

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) return res.status(400).json({ message:'Invalid Credentals' });

    const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn:'7d'});
    res.json({token, name: user.name});
    }
    catch(err){
        res.status(500).json({ message: 'Login Failed', error: err.message});
    }

};

module.exports = login;