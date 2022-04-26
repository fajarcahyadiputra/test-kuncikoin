
module.exports = (db, DataTypes) => {
    return db.define("users", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING,
            unique: true
        },
        name: DataTypes.STRING,
        password: DataTypes.STRING,
    }, {
        freezeTableName: true,
        timestamps: false,
    });
}