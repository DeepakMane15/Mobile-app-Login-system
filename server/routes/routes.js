var express = require('express');

const authController = require('../controllers/auth')


const router = express.Router();

router.post('/login', authController.login);

router.post('/signup', authController.signup);

router.get('/private', authController.isAuth);

router.get('/public', (req, res, next) => {
    res.status(200).json({ message: "here is your public resource" });
});

// will match any other path
router.use('/', (req, res, next) => {
    res.status(404).json({ error: "page not found" });
});

module.exports = router;