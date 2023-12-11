const express = require("express")
const mysql = require("mysql2")
const config = require("config")
const authRouter = require("./routes/auth.routes")

const app = express();

const corsMiddleware = require('./middleware/cors.middleware')

app.use(corsMiddleware)

app.use(express.json());

app.use("/api/auth", authRouter);


// app.get('/', (req, res) => { //Строка 9
//   res.render
// }); 

const connection = mysql.createConnection({
    host: config.get("db.host"),
    user: config.get("db.user"),
    password: config.get("db.password"),
    database: config.get("db.database"),
    port: config.get("db.port")
});
  
connection.connect((err) => {
  if (err) {
    console.error("Ошибка подключения к базе данных: ", err);
    return;
  }
  console.log("Подключение к базе данных успешно установлено!")
});

console.log(config.get('serverPort'))
const PORT = config.get('serverPort')

const start = async () => {
    try {
        app.listen(PORT, () => {
           console.log('Server started on port ', PORT) 
        })
    } catch(e){

    }
}

start()