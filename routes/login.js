'use strict';
const loginController = {
	iniciarSesion: function(req, res, usuarioModel, bcrypt){
		if(req.body){
			usuarioModel.findOne({correo: req.body.correo}).then(function(user){
				if(!user){
					res.json({success: false, msg: 'El usuario no existe'});
				}else{
					bcrypt.compare(req.body.password, user.password, function(err, isHash){
						if(!isHash){
							res.json({success: false, msg: 'Sus datos son incorrectos'});
						}else{
							res.json({success: true, msg:'Bienvenido'});
						}
					});
				}
			}, function(err){
				res.json({success: false, msg: 'Hubo un error en el servidor'});
			});
		}else{
			res.json({success: false});
		}
	},
};

module.exports = loginController;