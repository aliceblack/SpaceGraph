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

/* REST version */

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
            resolve({data:{ launches: response.data}});
        })
        .catch(error => {
          reject(error);
        });
    });
}


/* GraphQL version */

var { graphql, buildSchema } = require('graphql');
const graphqlHTTP = require('express-graphql').graphqlHTTP;

const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLBoolean,
    GraphQLList,
    GraphQLSchema
} = require('graphql');

const LaunchType = new GraphQLObjectType({
    name: 'Launch',
    fields: () => ({
        mission_name: { type: GraphQLString },
        launch_date_utc: { type: GraphQLString },
        launch_success: { type: GraphQLBoolean },
        details: { type: GraphQLString },
        flight_number: { type: GraphQLInt },
        rocket: { type: RocketType },
        links: { type: LinksType },
    })
});

const RocketType = new GraphQLObjectType({
    name: 'Rocket',
    fields: () => ({
      rocket_id: { type: GraphQLString },
      rocket_name: { type: GraphQLString },
      rocket_type: { type: GraphQLString }
    })
});

const LinksType = new GraphQLObjectType({
    name: 'Link',
    fields: () => ({
        mission_patch: { type: GraphQLString },
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      launches: {
        type: new GraphQLList(LaunchType),
        resolve(parent, args) {
          return axios
            .get('https://api.spacexdata.com/v3/launches')
            .then(res => res.data);
        }
      },
      launch: {
        type: LaunchType,
        args: {
          flight_number: { type: GraphQLInt }
        },
        resolve(parent, args) {
          return axios
            .get(`https://api.spacexdata.com/v3/launches/${args.flight_number}`)
            .then(res => res.data);
        }
      },
      rockets: {
        type: new GraphQLList(RocketType),
        resolve(parent, args) {
          return axios
            .get('https://api.spacexdata.com/v3/rockets')
            .then(res => res.data);
        }
      },
      rocket: {
        type: RocketType,
        args: {
          id: { type: GraphQLInt }
        },
        resolve(parent, args) {
          return axios
            .get(`https://api.spacexdata.com/v3/rockets/${args.id}`)
            .then(res => res.data);
        }
      }
    }
});

var schema = new GraphQLSchema({
    query: RootQuery
});

app.use(
    '/graphql',
    graphqlHTTP({
      schema,
      graphiql: true
    })
);


var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});

