let express = require("express");
let app = express();
let cors = require("cors");
let mysql = require("mysql2");
let connection = mysql.createConnection(
    {
        host         : "localhost",
        user         : "root",
        password     : "1234567",
        database     : "angular"
    }); 

connection.connect(function(error){
    if(error){
       console.log(error);
    }else{
       console.log('Conexion correcta.');
    }
 });

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/discos", 
        function(request, response)
        {
            let sql;
            sql = "SELECT * FROM discos";
            console.log(sql);  
            connection.query(sql, function (err, result) 
            {
                if (err){ 
                    console.log(err);
                }
                else 
                {
                    console.log(result);
                    response.send(result);
                }
            })
        }
        );

app.get("/discos/:id", 
        function(request, response)
        {
            let sql = "SELECT * FROM discos WHERE id=" + request.params.id;
            console.log(sql);  
            connection.query(sql, function (err, result) 
            {
                if (err){ 
                    console.log(err);
                }
                else 
                {
                    console.log(result)
                    response.send(result);
                }
            })
        }
        ); 
        
app.post("/discos", 
        function(request, response)
        {
            console.log(request.body);
            let sql = "INSERT INTO discos (titulo, interprete, anyoPublicacion) " + 
                    "VALUES ('" + request.body.titulo + "', '" + 
                                  request.body.interprete + "', '" +
                                  request.body.anyoPublicacion + "')";
            console.log(sql);                      
            connection.query(sql, function (err, result) 
            {
                if (err) 
                    console.log(err);
                else 
                {
                    if (result.insertId)
                        response.send(String(result.insertId));
                    else
                        response.send("-1");
                }
            })
        }
        );         

app.put("/discos", 
        function(request, response)
        {
            console.log(request.body);
            let params = [request.body.titulo, 
                          request.body.interprete, 
                          request.body.anyoPublicacion,
                          request.body.id]
            let sql = "UPDATE discos SET titulo = COALESCE(?, titulo) , " + 
                       "interprete = COALESCE(?, interprete) , " + 
                       "anyoPublicacion = COALESCE(?, anyoPublicacion)  WHERE id = ?";
            console.log(sql); 
            connection.query(sql, params,function (err, result) 
            {
                if (err) 
                    console.log(err);
                else 
                {
                    response.send(result);
                }
            })
        }
        ); 
        
app.delete("/discos", 
        function(request, response)
        {
            console.log(request.body);
            let sql = "DELETE FROM discos WHERE id = '" + request.body.id + "'";
            console.log(sql); 
            connection.query(sql, function (err, result) 
            {
                if (err) 
                    console.log(err);
                else 
                {
                    response.send(result);
                }
            })
        }
        ); 

 app.listen(3000);
