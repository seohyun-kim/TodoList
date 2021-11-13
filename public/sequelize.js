// 사용자 이름 눌렀을 때 댓글 로딩
document.querySelectorAll('#user-list tr').forEach((el) => {
    el.addEventListener('click', function () {
        const id = el.querySelector('td').textContent;
        getTodo(id);
    });
});

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
                getTodo(member.id);
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
            edit.textContent = `회원${member.id} 수정`;
            edit.addEventListener('click', async () => { // 수정 클릭 시
                // 초기 값을 기존 값으로 넣어 미입력을 방지, 나이는 숫자만 입력 받도록 처리
                const newAge =  parseInt(prompt('변경할 나이을 입력하세요', `${member.age}`));
                if (!newAge) { // 내용 없을 경우, 숫자 아닌 경우
                    return alert('변경을 취소합니다.');
                }
                const newName = prompt('변경할 이름을 입력하세요', `${member.name}`);
                if (!newName) {
                    return alert('변경을 취소합니다.');
                }
                try {
                    await axios.patch(`/members/${member.id}`, { age: newAge ,  name: newName});
                    getUser(); //함수 재 호출 (새로고침)
                } catch (err) {
                    console.error(err);
                }
            });
            const retrieve = document.createElement('button');
            retrieve.textContent = `회원${member.id} 의 TODO 조회`;
            retrieve.addEventListener('click', async () => { // 수정 클릭 시
                getTodo(member.id);
            });
            // 버튼 추가
            td = document.createElement('td');
            td.appendChild(edit);
            row.appendChild(td);
            td = document.createElement('td');
            td.appendChild(retrieve);
            row.appendChild(td);
            tbody.appendChild(row);
        });
    } catch (err) {
        console.error(err);
    }
}

// 댓글 로딩
async function getTodo(id) {
    try {
        const res = await axios.get(`/members/${id}`);
        const todos = res.data;
        const tbody = document.querySelector('#comment-list tbody');
        tbody.innerHTML = '';
        todos.map(function (todo) {
            // 로우 셀 추가
            const row = document.createElement('tr');
            let td = document.createElement('td');
            td.textContent = todo.id;
            row.appendChild(td);
            td = document.createElement('td');
            td.textContent = todo.Member.email;
            row.appendChild(td);
            td = document.createElement('td');
            td.textContent = todo.Member.name;
            row.appendChild(td);
            td = document.createElement('td');
            td.textContent = todo.content;
            row.appendChild(td);
            td = document.createElement('td');
            td.textContent = todo.isCompleted ? '⭕' : '❌';
            row.appendChild(td);

            const edit = document.createElement('button');
            edit.textContent = '수정';
            edit.addEventListener('click', async () => { // 수정 클릭 시
                const newCompleted = confirm('완료는 확인, 미완료는 취소를 클릭하세요.');
                try {
                    await axios.patch(`/todos/${todo.id}`, { isCompleted: newCompleted });
                    getTodo(id);
                } catch (err) {
                    console.error(err);
                }
            });
            const remove = document.createElement('button');
            remove.textContent = '삭제';
            remove.addEventListener('click', async () => { // 삭제 클릭 시
                try {
                    await axios.delete(`/todos/${todo.id}`);
                    getTodo(id);
                } catch (err) {
                    console.error(err);
                }
            });
            // 버튼 추가
            td = document.createElement('td');
            td.appendChild(edit);
            row.appendChild(td);
            td = document.createElement('td');
            td.appendChild(remove);
            row.appendChild(td);
            tbody.appendChild(row);
        });
    } catch (err) {
        console.error(err);
    }
}

// 사용자 등록
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

// 댓글 등록
document.getElementById('comment-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = e.target.userid.value;
    const content = e.target.content.value;
    const isCompleted = e.target.isCompleted.checked;
    if (!id) {
        return alert('아이디를 입력하세요');
    }
    if (!content) {
        return alert('할일을 입력하세요');
    }
    try {
        await axios.post('/todos', { id, content, isCompleted });
        getTodo(id);
    } catch (err) {
        console.error(err);
    }
    e.target.userid.value = '';
    e.target.comment.value = '';
    e.target.isCompleted.value = false;
});

//default
getUser();
