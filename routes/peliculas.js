var express = require('express');
var router = express.Router();
var peliculasController = require("../controllers/peliculasController")

/* Creación */
router.get('/crear', peliculasController.crear); 
router.post('/crear', peliculasController.save);

/* Lectura -> listado */
router.get('/', peliculasController.listado);

/* Detalle */
router.get('/:id', peliculasController.detalle);

/* Actualización */
router.get('/editar/:id', peliculasController.editar);
router.post('/editar/:id', peliculasController.actualizar);

/* Eliminar */
router.post('/borrar/:id', peliculasController.eliminar);


module.exports = router;