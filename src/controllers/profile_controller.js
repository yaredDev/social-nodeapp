const { User, Post, Comments } = require("../Database");

const profileView = async (req, res, next) => {
    try {
        res.render("profile");
    } catch (error) {
        console.log(error)
    }
};

module.exports = { profileView };
