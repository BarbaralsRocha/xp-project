const userService = require('../service/user.service');
const authentication = require('../utils/generateToken');

const newUser = async (req, res) => {
    try {
        await userService.createUser(req.body);
        const token = await authentication(req.body);
        return res.status(201).json(token);
    } catch (e) {
        console.log(e.message)
        return res.status(409).json({ message: 'User already registered' });
    }
};

const getUsers = async (req, res) => {
    const user = await userService.getUsers(req.body);
    return res.status(200).json(user);
};

module.exports = {
    newUser,
    getUsers
};