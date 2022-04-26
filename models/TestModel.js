
module.exports = (db, DataTypes) => {
    return db.define("test_table", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        master: DataTypes.STRING,
        slave: DataTypes.STRING
    }, {
        freezeTableName: true,
        timestamps: false,
    });
}