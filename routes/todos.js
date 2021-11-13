const express = require('express');
const { Todo } = require('../models');
const Member = require("../models/Member");

const router = express.Router();

// localhost:8080/todos/
router.post('/', async (req, res, next) => {
    try {
        const todo = await Todo.create({ //INSERT
            member: req.body.id,
            content: req.body.content,
            isCompleted: req.body.isCompleted
        });
        console.log(todo);
        res.status(201).json(todo);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.route('/:id')
    //할 일 단건 조회
    .get(async (req, res, next) => {
        try {
            const id = req.params.id;
            const todos = await Todo.findOne({
                include: {
                    model: Member,
                    where: { id: req.params.id },
                },
            });
            console.log(todos);
            res.json(todos);
        } catch (err) {
            console.error(err);
            next(err);
        }
    })
    .patch(async (req, res, next) => {
        try {
            const result = await Todo.update({
                isCompleted: req.body.isCompleted,
            }, {
                where: { id: req.params.id },
            });
            res.json(result);
        } catch (err) {
            console.error(err);
            next(err);
        }
    })
    .delete(async (req, res, next) => {
        try {
            const result = await Todo.destroy({ where: { id: req.params.id } });
            res.json(result);
        } catch (err) {
            console.error(err);
            next(err);
        }
    });

module.exports = router;
