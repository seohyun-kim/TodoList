

// // 사용자 이름 눌렀을 때 댓글 로딩
// document.querySelectorAll('#user-list tr').forEach((el) => {
//     el.addEventListener('click', function () {
//         const id = el.querySelector('td').textContent;
//         getComment(id);
//     });
// });

// 사용자 로딩
async function getUser() {
    try {
        const res = await axios.get('/members');
        const members = res.data;
        console.log(members);
        const tbody = document.querySelector('#user-list tbody');
        tbody.innerHTML = '';
        members.map(function (member) {
            // 로우 셀 추가
            const row = document.createElement('tr');
            row.addEventListener('click', () => {
                console.log("row clicked!");
               /// getComment(user.id);
            });
            let td = document.createElement('td');
            td.textContent = member.id;
            row.appendChild(td);

            td = document.createElement('td');
            td.textContent = member.email;
            row.appendChild(td);

            td = document.createElement('td');
            td.textContent = member.age;
            row.appendChild(td);

            td = document.createElement('td');
            td.textContent = member.name;
            row.appendChild(td);

            const edit = document.createElement('button');
            edit.textContent = '수정';
            edit.addEventListener('click', async () => { // 수정 클릭 시
                const newAge = prompt('바꿀 나이을 입력하세요');
                const newName = prompt('바꿀 이름을 입력하세요');
                if (!newAge) {
                    return alert('내용을 반드시 입력하셔야 합니다');
                }
                if (!newName) {
                    return alert('내용을 반드시 입력하셔야 합니다');
                }

                try {
                    await axios.patch(`/members/${member.id}`, { age: newAge ,  name: newName});
                    getUser(); //함수 재 호출 (새로고침)
                } catch (err) {
                    console.error(err);
                }
            });

            // 버튼 추가
            td = document.createElement('td');
            td.appendChild(edit);
            row.appendChild(td);
            tbody.appendChild(row);

        });
    } catch (err) {
        console.error(err);
    }
}


// // 댓글 로딩
// async function getComment(id) {
//     try {
//         const res = await axios.get(`/users/${id}/comments`);
//         const comments = res.data;
//         const tbody = document.querySelector('#comment-list tbody');
//         tbody.innerHTML = '';
//         comments.map(function (comment) {
//             // 로우 셀 추가
//             const row = document.createElement('tr');
//             let td = document.createElement('td');
//             td.textContent = comment.id;
//             row.appendChild(td);
//             td = document.createElement('td');
//             td.textContent = comment.User.name;
//             row.appendChild(td);
//             td = document.createElement('td');
//             td.textContent = comment.comment;
//             row.appendChild(td);
//             const edit = document.createElement('button');
//             edit.textContent = '수정';
//             edit.addEventListener('click', async () => { // 수정 클릭 시
//                 const newComment = prompt('바꿀 내용을 입력하세요');
//                 if (!newComment) {
//                     return alert('내용을 반드시 입력하셔야 합니다');
//                 }
//                 try {
//                     await axios.patch(`/comments/${comment.id}`, { comment: newComment });
//                     getComment(id);
//                 } catch (err) {
//                     console.error(err);
//                 }
//             });
//             const remove = document.createElement('button');
//             remove.textContent = '삭제';
//             remove.addEventListener('click', async () => { // 삭제 클릭 시
//                 try {
//                     await axios.delete(`/comments/${comment.id}`);
//                     getComment(id);
//                 } catch (err) {
//                     console.error(err);
//                 }
//             });
//             // 버튼 추가
//             td = document.createElement('td');
//             td.appendChild(edit);
//             row.appendChild(td);
//             td = document.createElement('td');
//             td.appendChild(remove);
//             row.appendChild(td);
//             tbody.appendChild(row);
//         });
//     } catch (err) {
//         console.error(err);
//     }
// }

// 사용자 등록 시
document.getElementById('user-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const name = e.target.username.value;
    const age = e.target.age.value;

    if (!email) {
        return alert('이메일을 입력하세요');
    }
    const reg_email = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
    if(!reg_email.test(email)) {
        return alert('이메일 형식이 아닙니다.');
    }
    if (!name) {
        return alert('이름을 입력하세요');
    }
    if (!age) {
        return alert('나이를 입력하세요');
    }
    try {
        await axios.post('/members', { email, age, name });
        getUser();
    } catch (err) {
        console.error(err);
    }
    e.target.username.value = '';
    e.target.age.value = '';
    e.target.username.value = '';
});


// // 회원 조회 버튼 클릭 시
// document.getElementById('memRetrieve').addEventListener('button', async () => {
//     console.log("조회 버튼 클릭!~!!==========");
//     try {
//         //await axios.patch(`/members/${member.id}`, { age: newAge });
//         getUser();
//     } catch (err) {
//         console.error(err);
//     }
//
// });



// // 댓글 등록 시
// document.getElementById('comment-form').addEventListener('submit', async (e) => {
//     e.preventDefault();
//     const id = e.target.userid.value;
//     const comment = e.target.comment.value;
//     if (!id) {
//         return alert('아이디를 입력하세요');
//     }
//     if (!comment) {
//         return alert('댓글을 입력하세요');
//     }
//     try {
//         await axios.post('/comments', { id, comment });
//         getComment(id);
//     } catch (err) {
//         console.error(err);
//     }
//     e.target.userid.value = '';
//     e.target.comment.value = '';
// });

//default
getUser();