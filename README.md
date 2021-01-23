# SpaceGraph

An app that uses GraphQL to elaborate SpaceX APIs.

## Space X
> https://docs.spacexdata.com/

## GraphQL
> https://graphql.org/

### Express
> https://graphql.org/graphql-js/running-an-express-graphql-server/

### Apollo
> https://graphql.org/code/#javascript

## Data

Data we wanna get using GraphQL on SpaceX:

```
https://api.spacexdata.com/v3/launches
[
    {

        "mission_name": "DemoSat",
        "launch_date_utc": "2007-03-21T01:10:00.000Z",
        "rocket": {
            "rocket_name": "Falcon 1",
            "rocket_type": "Merlin A",
        },
        "links": {
            "mission_patch": "https://images2.imgbox.com/be/e7/iNqsqVYM_o.png"
        },
        "details": "Successful first stage burn and transition to second stage, maximum altitude 289 km, Premature engine shutdown at T+7 min 30 s, Failed to reach orbit, Failed to recover first stage"
    }
]
```
