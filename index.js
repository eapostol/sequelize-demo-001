let express = require("express");
let db = require("./models");

const PORT = process.env.PORT || 3000;
const app = express();

const callBack  = () =>{
    let onConnect= () => {
        console.log('listening on port %s', PORT)
    };
    app.listen(PORT,onConnect);
};

db.sequelize.sync().then(callBack);