const express = require('express');
const Member = require('../models/Member');
const Todo = require('../models/Todo');

const router = express.Router();

// localhost:8080/members/
router.route('/')
    .get(async (req, res, next) => {
        try {
            const members = await Member.findAll(); //회원 전체 조회
            res.json(members);
            console.log("200 : 회원 리스트가 정상적으로 조회되었습니다.")
        } catch (err) {
            console.error(err);
            next(err);
        }
    })
    .post(async (req, res, next) => {
        try {
            //이메일 중복 처리
            const email = req.body.email;
            const exUser = await Member.findAll({  where: { email : email } });
            //console.log(JSON.stringify(exUser));
            if (exUser.length >0) {
                console.log("이메일이 중복됩니다.");
                //res.write('<script type="text/javascript">alert("이메일이 중복됩니다.");</script>');
                res.status(201);
            }else{
                console.log("이메일 사용 가능합니다.");
                //DB에 저장
                const members = await Member.create({
                    email: req.body.email,
                    age: req.body.age,
                    name: req.body.name,
                }); // INSERT
                console.log(members);
                res.status(201).json(members);
            }
        } catch (err) {
            console.error(err);
            next(err);
        }
    });

// 사용자 단건조회와 수정
router.route('/:id')
    .get(async (req, res, next) => {
        try {
            const todos = await Todo.findAll({
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
            const result = await Member.update({
                age: req.body.age,
                name: req.body.name
            }, {
                where: { id: req.params.id },
            });
            res.json(result);
        } catch (err) {
            console.error(err);
            next(err);
        }
    });

module.exports = router;