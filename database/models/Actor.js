module.exports = function(sequelize, dataTypes){
    let alias = "Actor";
    let cols =  {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true    
        },
        first_name: {
            type:dataTypes.STRING
        },
        last_name:{
            type: dataTypes.INTEGER
        }        
    }

    let config = {
        tableName: "actors",
        timestamps: false
    }    

    let Actor = sequelize.define(alias,cols,config);

    Actor.associate = function(models){
        Actor.belongsToMany(models.Pelicula, {  // N:M para ello necesitamos una tabla pivot
            as:"peliculas",                     // Alias de la relacion            
            through: "actor_movie",             // tabal pivot de la N:M
            foreignKey: "actor_id",             // clave foránea de esta tabla en la relacion
            otherKey: "movie_id",               // la otra clave
            timestamps: false                   // Al ser tabla intermedia debemos definir el timestamp
        });
    }
    return Actor;     
}