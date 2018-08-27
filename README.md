# Sequelize Demo 001
A Simple Demo for Node, Express (4), mySQL2, Sequelize and body-parser

The _master_ branch contains just the base dependencies, this README, and a .gitignore.

Subsequent Branches represent successive builds of the example. Explore those branches to see this app evolves.

Installed NPM packages:

- "body-parser": "^1.18.3"
- "express": "^4.16.3",
- "mysql2": "^1.6.1",
- "sequelize": "^4.38.0"

**body**-**parser** extracts the entire **body** portion of an incoming request stream and exposes it on req. **body** . The middleware was a part of Express.js earlier but now is installed separately. This module parses the JSON, buffer, string and URL encoded data submitted using HTTP POST request.

The **MySQL2 project** is a continuation of [MySQL-Native](https://github.com/sidorares/nodejs-mysql-native). Protocol parser code was rewritten from scratch and api changed to match popular [mysqljs/mysql](https://github.com/mysqljs/mysql). MySQL2 team is working together with [mysqljs/mysql](https://github.com/mysqljs/mysql) team to factor out shared code and move it under [mysqljs](https://github.com/mysqljs/mysql) organisation

**Sequelize** is a promise-based ORM for Node.js v4 and up. It supports the dialects PostgreSQL, MySQL, SQLite and MSSQL and features solid transaction support, relations, read replication and more.

## Branches:
### 001-setting-up-sequelize-project
* this branch has tasks that setup the sequelize project

`​sequelize init:config & sequelize init:models`

The results should be seen in the images shown below

(insert execution of command image)

(insert new files and folders added image)

### 002-connecting-database

Before setting up Sequelize to work with our database, you will need to review the configuration settings defined in */config/config.json*.

*config.json*​ stores in JSON format the details about the environment(s) that our database will be running within. To get started, alter the contents of the "development" object to match your local MYSQL database. If you already have a production database (a database you'll use when your app is deployed), go ahead and update those credentials in the "production" object.

Next open up the models folder. Currently there should be a file inside named `​index.js`.​ This directory is where we will define all of our sequelize models. Before we create our first model, however, here is an explanation of ​`i​ndex.js`​ and what it's doing for us. You may skip over this next part if you would like, it's not necessary to Next open up the models folder.

Currently there should be a file inside named `​index.js`.​ This directory is where we will define all of our sequelize models. Before we create our first model, however, here is an explanation of ​`i​ndex.js`​ and what it's doing for us. You may skip over this next part if you would like, it's not necessary to completely understand, but for some it may help.

This index.js does a few key things that make setting our project up with Sequelize much easier.

First it figures out which database it should use based on whether we're deployed to heroku ("production") or running locally ("development") and will use the appropriate configuration inside config.json. We can also optionally specify a database to be used for testing if we want.

Then it goes through every other JavaScript file inside our models folder and runs them through Sequelize. It gives our models all of Sequelize's helper methods and makes sure that all of the associations between models are properly set up. It exports an object we will use to interface with Sequelize in our other files.

Important ​Note​: On some versions of Windows, the slashes on line 8 may be backslashes ("\\") instead of forward slashes ("/"). If you notice this, be sure to manually fix it before proceeding.

Now let's create a new file inside of our models folder. As an example, we'll create a model for a User. Save it as user.js.

Inside this file add in the following code

`module.exports = (sequelize, DataTypes) => {
     let userObj = {
         email: DataTypes.STRING,
         password: DataTypes.STRING
     };
     return sequelize.define("User", userObj);
 };`

This is just about the minimum amount of code we need to write to create a Sequelize model. We export a function that takes in 2 variables. sequelize, and DataTypes. These are provided to us automatically by index.js.

"sequelize" in this case is actually our connection to our database.

DataTypes will be used to defining what type of data each property on our model should be. http://docs.sequelizejs.com/en/latest/api/datatypes/#string

Inside of our function we run the "sequelize.define" method. We pass it two arguments. The name of our model as a string, and an object describing our model's schema. Each property will represent a column in the database.

sequelize.define returns an object, which we store inside the variable "User". We return this variable at the end of the function on line 6.

## 003-sync-database

In order to create tables from our models, we need to sync them with our database. To do this, we'll utilize the sequelize.sync() method.

Navigate to your index.js file and add the following code.

`'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;`

On line 2 we require our entire models folder. This just requires the index.js file by default. We could have also done 'require('./models/index');' if we wanted.

On line 8 we sync our database. The sequelize property on the db object is actually our connection to our database. 'sync' is a built in sequelize method that creates tables using the models we describe. After our database is sync'ed (this may take a certain amount of time) we start our express server. Using this method, we guarantee that our server won't start before our database is ready. We also guarantee that our server won't start

6

if there's an error connecting to our database. To check if this worked, open your database in MYSQL Workbench or the SQL GUI of your choice to see if the tables were added

** confirm that you had created a database previously called database_development through mysql workbench or in terminal

The information is displayed as follows: Database > Tables > Columns

Sequelize will pluralize our table names by default, so always name your models in the singular.

Sequelize will also by default give us an auto-incrementing primary-key id, an updatedAt and a createdAt column. These are helpful if you need to do any kind of sorting by date when retrieving entries.

And that's all that's needed to connect set up a project with Sequelize.



















