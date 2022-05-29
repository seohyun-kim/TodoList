# TodoList
Nodejs(express, sequelize)

[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Fseohyun-kim%2FTodoList&count_bg=%23E8B3F1&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false)](https://hits.seeyoufarm.com)  




## 개발과정
[1 - SetUp & Table 생성 및 연결](https://velog.io/@selenium/Server-Study-ToDo-List-%EA%B0%9C%EB%B0%9C%EA%B3%BC%EC%A0%95-1-SetUp-Table-%EC%83%9D%EC%84%B1-%EB%B0%8F-%EC%97%B0%EA%B2%B0)  

[2 - 회원 생성/조회/수정](https://velog.io/@selenium/Server-Study-ToDo-List-%EA%B0%9C%EB%B0%9C%EA%B3%BC%EC%A0%95-2-%ED%9A%8C%EC%9B%90-%EC%83%9D%EC%84%B1%EC%A1%B0%ED%9A%8C%EC%88%98%EC%A0%95)  

[3 - TODO 생성/조회/수정/삭제](https://velog.io/@selenium/Server-Study-ToDo-List-%EA%B0%9C%EB%B0%9C%EA%B3%BC%EC%A0%95-3-TODO-%EC%83%9D%EC%84%B1%EC%A1%B0%ED%9A%8C%EC%88%98%EC%A0%95%EC%82%AD%EC%A0%9C)

<br>

[▶️ 동작시연](https://www.youtube.com/watch?v=NHnJrNwNI-A)

<br>

### 1. 모듈 설치  
```
npm install
```


### 2. config/config_templete.json 수정
 - 파일명 `config.json`으로 변경
 - mysql 계정 연결 (비밀번호 입력)
```json
{
  "development": {
    "username": "root",
    "password": "INSERT YOUR PASSWORD HERE!",
    "database": "todolist",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
```  

### 3. db 생성
```
npx sequelize db:create
```



### 4. 앱 실행
```
node app.js
```
