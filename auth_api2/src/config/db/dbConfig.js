import Sequelize from "sequelize"

const sequelize = new Sequelize("auth_api", "postgres", "mon123", {
    host: "localhost",
    dialect: "postgres",
    quoteIdentifiers: false,
    define: {
        syncOnAssociation: true,
        timestamps: false, 
        underscored: true,
        underscoredAll: true, 
        freezeTableName: true, 
    },
})

sequelize
    .authenticate()
    .then(() => {
        console.info("Connection has been stablished!");
    })
    .catch((err) => {
        console.error("Unable to connect to the database")
        console.info(err.message)
    })

export default sequelize