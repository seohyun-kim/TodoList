const express = require('express');
const Member = require('../models/Member');


const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const members = await Member.findAll();
        res.render('sequelize', { members });
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;