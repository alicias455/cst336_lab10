const express = require("express");
const app = express();
const mysql = require('mysql');

// you can optionally use handlebars
app.set("view engine", "ejs");
app.use(express.static("public")); //access images, css, js

// enable use of json
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// routes
app.get("/", function(req, res){

    const connection = mysql.createConnection({
        host: 'er7lx9km02rjyf3n.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        user: 'jqu8aralz7x2d3f8',
        password: 'j33452dd1h4o9zil',
        database: 'upz1sirhhzk031zd'
    });

    connection.connect();

    connection.query(`SELECT * from author`,
        function(error, results, fields) {
            if (error) throw error;
            res.render('index.ejs', {
                title: 'Lab 10',
                authors: results
            });
        });

    connection.end();

} );

app.get("/new", function(req, res){

    const connection = mysql.createConnection({
        host: 'er7lx9km02rjyf3n.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        user: 'jqu8aralz7x2d3f8',
        password: 'j33452dd1h4o9zil',
        database: 'upz1sirhhzk031zd'
    });

    connection.connect();

    connection.query(`SELECT MAX(id) as largest FROM author`,
        function(error, results) {
            if (error) throw error;

            console.log(results);
            console.log(results[0].largest);
            res.render('new.ejs', {
                title: 'Lab 10',
                unique_id: results[0].largest + 1
            });
        });
});

app.post("/new", function(req, res){

    const connection = mysql.createConnection({
        host: 'er7lx9km02rjyf3n.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        user: 'jqu8aralz7x2d3f8',
        password: 'j33452dd1h4o9zil',
        database: 'upz1sirhhzk031zd'
    });

    connection.connect();

    console.log(req.body);
    var body = req.body;

    connection.query(`INSERT INTO author VALUES (${body.id}, '${body.FirstName}', '${body.LastName}', '${body.dob}', '${body.dod}, '${body.gender}'')`,
        function(error, results) {
            if (error) throw error;

            console.log(body);
            res.render('new.ejs', {
                title: 'Lab 10',
                unique_id: parseInt(body.id, 10) + 1
            });
        });
});


app.get("/edit", function(req, res){

    const connection = mysql.createConnection({
        host: 'er7lx9km02rjyf3n.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        user: 'jqu8aralz7x2d3f8',
        password: 'j33452dd1h4o9zil',
        database: 'upz1sirhhzk031zd'
    });

    connection.connect();

    connection.query(`SELECT MAX(id) as largest FROM author`,
        function(error, results) {
            if (error) throw error;

            console.log(results);
            console.log(results[0].largest);
            res.render('edit.ejs', {
                title: 'Lab 10',
                unique_id: results[0].largest + 1
            });
        });
});

app.post("/edit", function(req, res, next){

    const connection = mysql.createConnection({
        host: 'er7lx9km02rjyf3n.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        user: 'jqu8aralz7x2d3f8',
        password: 'j33452dd1h4o9zil',
        database: 'upz1sirhhzk031zd'
    });

    connection.connect();

    if(re.body.authorId && req.body.authorId.length > 0){
        connection.query(
            'UPDATE author SET authorId = ? WHERE authorId = ?', [req.body.authorId, req.body.authorId], // assuming POST
            (error, results, fields) => {
                if (error) throw error;
                res.json({
                    id: results.authorId
                });
            });
    }
    else{
        connection.query(
            'INSERT INTO author(authorId) VALUES (?)', [req.body.authorId], // assuming POST
            (error, results, fields) => {
                if (error) throw error;
                res.json({
                    id: results.insertId
                });
            });
    }

    connection.end();

    // console.log(req.body);
    // var body = req.body;
    //
    // connection.query(`INSERT INTO author VALUES (${body.id}, '${body.FirstName}', '${body.LastName}', '${body.dob}', '${body.dod}', '${body.gender}')`,
    //     function(error, results) {
    //         if (error) throw error;
    //
    //         console.log(body);
    //         res.render('edit.ejs', {
    //             title: 'Lab 10',
    //             unique_id: parseInt(body.id, 10) + 1
    //         });
    //     });
});

app.get("/delete", function(req, res){
    if (!req.query.id || req.query.id.length === 0) {
        return next(new Error("There is a problem"));
    }
    const connection = mysql.createConnection({
        host: 'er7lx9km02rjyf3n.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        user: 'jqu8aralz7x2d3f8',
        password: 'j33452dd1h4o9zil',
        database: 'upz1sirhhzk031zd'
    });

    connection.connect();

    connection.query(`SELECT * from author`,
        function(error, results, fields) {

            //console.log('results', results[0]);

            if (error) throw error;

            res.render('delete.ejs', {
                title: 'Lab 10 Delete Quote',
                data: results[0]
            });
        });

    connection.end();
});

app.delete('/delete', function(req, res, next) {

    if (!req.body.authorId || req.body.authorId.length === 0) {
        return next(new Error("There is a problem"));
    }

    const connection = mysql.createConnection({
        host: 'er7lx9km02rjyf3n.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        user: 'jqu8aralz7x2d3f8',
        password: 'j33452dd1h4o9zil',
        database: 'upz1sirhhzk031zd'
    });

    connection.connect();

    connection.query(
        'DELETE FROM author WHERE authorId = ?', [req.body.authorId], // assuming POST
        (error, results, fields) => {
            if (error) throw error;
            res.json({
                id: results.quoteId
            });
        });

    connection.end();

});

// running server
// app.listen("3000", "0.0.0.0", function() {
//     console.log("Express Server is Running...")
// });

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Running Express Server...");
});