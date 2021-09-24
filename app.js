const express=require('express');
const sql=require('sqlite3');

const app = express();
app.use(
    express.urlencoded({
      extended: true,
    })
  );
let db = new sql.Database("deebee.db", (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log("Connected to the database.");
    }
  });

db.run(
    "CREATE TABLE IF NOT EXISTS users(uname text primary key not null,pw text not null)"
);

db.run(
    `INSERT INTO users(uname,pw) VALUES(?,?)`,
    ['admin', 'aiowjdawiodjoiw'],
    function (err) {
      if (err) {
        console.log(err.message);
      }
    }
  );

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });

app.post("/login",(req,res)=>{
    let username = req.body.username;
    let password = req.body.password;
    db.get(`select exists(select * from users where uname='` + username + `' and pw='` + password + `');`,(err,value)=>{
        if(err){
            console.log(err);
        }
        else{
            let idk=value[Object.keys(value)[0]];
            if(idk){
                res.sendFile(__dirname + '/1.html');
            }   
            else{
                res.sendFile(__dirname + '/2.html');
            }
            console.log(value);
        }
    })
}
)

const port = 3000; // Port we will listen on

// Function to listen on the port
app.listen(port, () => console.log(`This app is listening on port ${port}`));