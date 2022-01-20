//const req = require("express/lib/request");

let db = require("../database/models");  // Asignamos a la variable DB la localización de la BD y los modelos

let peliculasController = {
    crear: ((req,res) => {
        db.Genero.findAll()              // Vamos a bucar todos los géneros del modelo configurado
            .then((generos) => {         // al ser sincrónico necesitamos una promesa
                return res.render("creacionPeliculas", {generos:generos})  // renderizamos una vista y compartimos el listado de generos   
            })                        
    }),   
    save: function (req, res) {
        db.Pelicula.create({              //Vamos a crear una pelicula en el modelo con los datos del form enviados
            title: req.body.title,
            award: req.body.award,
            release_date: req.body.release_date,
            genre_id: req.body.genre,
            length: req.body.length,
            rating: req.body.rating
        });

        res.redirect('/peliculas'); 
    },
    listado: function (req, res){
        db.Pelicula.findAll()
            .then(function(peliculas){           // Qry asincrónica por lo que va a demorar y debe ser una promesa
                res.render('listadPeliculas', {peliculas:peliculas});    
            })
    },
    detalle: function (req, res){
        db.Pelicula.findByPk(req.params.id, {
            include: [{association: 'genero'}, {association: 'actores'}]  // Uso los nombres definidos como As: en los modelos
        })
            .then(function(pelicula){           // Qry asincrónica por lo que va a demorar y debe ser una promesa
                res.render('detallePelicula', {pelicula:pelicula});    
            })
    },
    editar: function(req, res){
        let pedidoPelicula = db.Pelicula.findByPk(req.params.id); // al modelo pelicula le pedimos por id
        let pedidoGeneros = db.Genero.findAll(); // al modelo genero solicitamos todos

        Promise.all([pedidoPelicula, pedidoGeneros])
            // se va a ejecutar cdo finalicen de ejcutarse las dos promesas
            // esta fc de resultados, recibe dos parametros -> 1 array con la pelicula a editar y 2 generos 
            // la primer promesa se resulve en pelicual y la segunda en generos
            .then(function([pelicula, generos]){
                res.render('editarPelicula', {pelicula:pelicula, generos:generos})

            })
    },
    actualizar: function(req,res) {
        db.Pelicula.update({              //Vamos a crear una pelicula en el modelo con los datos del form enviados
            title: req.body.title,
            award: req.body.award,
            release_date: req.body.release_date,
            genre_id: req.body.genre,
            length: req.body.length,
            rating: req.body.rating
        }, {
            where: {
                id: req.params.id
            } 
        });

        res.redirect('/peliculas/' + req.params.id) // Nos envia por /peliculas/:id a la vista y ver los cambios actualizados
    },
    eliminar: function(req, res) {
        db.Pelicula.destroy({
            where: {
                id: req.params.id  // No olvidar el condicional con el criterio de eliminación   
             }    
        })
        res.redirect('/peliculas') // Finalizado el destroy redireccionar a la vista          
    }
    
} 

module.exports = peliculasController;