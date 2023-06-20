const cors= require('cors')
const express = require('express')
const mysql=require('mysql2')
const app = express()
const port = 5000
var connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root', 
  password: '922003', 
  database: 'sudoku',
  port:'3306'
})

// Hàm truy vấn
function query(sql) {
  connection.connect()
  const res= new Promise((res,rej)=>{
    connection.query(sql,(err,results)=>{
      if (err) rej(err);
      res(results);
    })
  })
  return res;
}

app.use(cors())
app.use(express.urlencoded());
app.use(express.json());

// app.get('/export_puzzle', (req, res) => {
//   const data=query('select * from bill;')
//   data
//   .then(data=>console.log(data))
//   .catch(err=>console.log(data));
  
// })
app.post('/export_puzzle',(req,res)=>{
  const data=req.body.puzzle;
  const sql=`insert into puzzles (puzzle) values ('${data}');`
  const results=query(sql);
  results
  .then(data=>{
    res.json(data)
  })
  .catch(err=>res.json(err))
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})