'use strict';
const mongoose = require('mongoose');
const userController = {
	/**
	 * POST usuario.
	 * @param  body-parser req: Parametros enviados por un formulario
	 * @param  express.res res: Respuesta de la ruta
	 * @param  {[type]} next) {	            	} [description]
	 * @return json: Objeto que verifica si los datos del usuario han sido creados
	 *               en la DB de forma exitosa
	 */
	nuevoUsuario: function(req, res, usuarioModel, bcrypt){
	  if(!req.body) 
	  	return res.json({success: false, msg: 'Los datos no fueron enviados, intente nuevamente'});
	  const salting = 12;
	  bcrypt.hash(req.body.password, null, null, function(err, hashed){
	  	if(err) throw err;
	  	console.log(hashed);
	  	let password = hashed;
	  	let newUser = new usuarioModel({
	  		nombre: req.body.nombre,
	  		apat: req.body.apat,
	  		amat: req.body.amat,
	  		correo: req.body.correo,
	  		password: password,
	  		ciudad_residencia: req.body.ciudad,
	  		telefono: {
	  			celular: req.body.celular,
	  			codigo_area: req.body.codigo_area_cel,
	  		},
	  		ci: req.body.carnet 
		});
		newUser.save().then(function(doc){
			res.json({success: true});
		}, function(err){
			console.log(err.message);
			res.json({success: false, msg: 'Hubo un error con el servidor'});
		});

	  });
	},	
	usuarios: function(req, res){
		return res.json({name: 'pablo'});
	}
};


module.exports = userController;