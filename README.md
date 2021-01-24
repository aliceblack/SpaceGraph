# SpaceGraph

An app that uses GraphQL to elaborate SpaceX APIs.

## Hosting
💵💷💴 It's free hosting in the end, hit the link a couple of times if the app is sleeping. 🌖⭐💤

## Space X
> https://docs.spacexdata.com/
 

## GraphQL
> https://graphql.org/

Make a decision between Express and Apollo:

* Express https://graphql.org/graphql-js/running-an-express-graphql-server/
* Apollo https://graphql.org/code/#javascript

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

# Heroku

The project is an Angular Web App with a NodeJS API deployed to Heroku.
The following configuration is used to run on Heroku.

File `package.json` from:
```
"start": "ng serve",
```
to:
```
"start": "node server.js",
```

File `main.ts`, added:
```
import './polyfills.ts';
```

Install libraries and save the dependencies to `package.json` file so that they will also be installed when we deploy the application to Heroku:
```
npm install axios express body-parser cors --save
```

Install the Angular CLI so that remote Heroku deployment can use it:
```
npm install --save @angular/cli @angular/compiler-cli
```

Added in `package.json`:
```
"postinstall": "ng build --output-path dist"
```

Copy from dev dependencies to dependencies:
```
"@angular/cli": "^8.0.6",
"@angular/compiler-cli": "^8.0.3",
```

## Notes
Note that ng serve is serving the node server.js API wich is the one exsposing /dist folder.

# Angular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.0.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
