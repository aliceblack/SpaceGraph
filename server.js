var express = require("express");
var bodyParser = require("body-parser");

const axios = require('axios');
const { resolve } = require('path');

var app = express();
app.use(bodyParser.json());

var cors = require('cors');
app.use(cors());

// Create link to Angular build directory
var distDir = __dirname + "/dist/spacegraph";
app.use(express.static(distDir));

app.get('/missions', (req, res) => {
    getMissionsFromSpaceX()
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        console.log(error)
        res.status(500).send(error);
    });
});

function getMissionsFromSpaceX(){
    return new Promise( (resolve, reject) =>{
        var url = 'https://api.spacexdata.com/v3/launches';
        axios.get(url)
        .then(response => {
            resolve(response.data);
        })
        .catch(error => {
          reject(error);
        });
    });
}

var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});

