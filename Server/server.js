const cors = require("cors");
const express = require("express");
const mysql = require("mysql2");
const cookieParser = require("cookie-parser");
const app = express();
const port = 5000;
var connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "922003",
  database: "sudoku",
  port: "3306",
});

// Hàm truy vấn
function query(sql) {
  connection.connect();
  const res = new Promise((res, rej) => {
    connection.query(sql, (err, results) => {
      if (err) rej(err);
      res(results);
    });
  });
  return res;
}

app.use(cors());
app.use(express.urlencoded());
app.use(express.json());
app.use(cookieParser());

// Đăng nhập
app.post("/login", (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  var remember = req.body.remember;
  var sql = `select password from account where username=\'${username}\';`;
  const Query = query(sql);
  Query.then((results) => {
    if (results[0].password == password) res.json("Đăng nhập thành công!");
    else res.json("Sai tài khoản hoặc mật khẩu!");
  }).catch((err) => res.json(err));
});
// Đăng ký tài khoản
app.post("/register", (req, res) => {
  var fullname = req.body.fullname;
  var email = req.body.email;
  var username = req.body.username;
  var password = req.body.password;
  var sql = `insert into account(fullname,email,username,password) values (\'${fullname}\',\'${email}\',\'${username}\',\'${password}\');`;
  const Query = query(sql);
  Query.then((results) => {
    res.json(results);
  }).catch((err) => res.json(err));
});
// Nhận câu đố
app.get("/get_puzzle", (req, res) => {
  const sql = `select puzzle from puzzles where \`id\`="2";`;
  const Query = query(sql);
  Query.then((result) => res.json(result)).catch((err) => res.json(err));
});

// Thêm câu đố
app.post("/export_puzzle", (req, res) => {
  const data = req.body.puzzle;
  const sql = `insert into puzzles (puzzle) values ('${data}');`;
  const results = query(sql);
  results
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.json(err));
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
