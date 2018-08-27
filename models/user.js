module.exports = (sequelize, DataTypes)=>{
    let userObj = {
        email: DataTypes.STRING,
        password: DataTypes.STRING
    };
    return sequelize.define("User", userObj);
};