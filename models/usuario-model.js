'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let UsuarioSchema = new mongoose.Schema({
	nombre: {
		type: String,
		required: true
	},
	apat: {
		type: String,
		required: true	
	},
	amat: {
		type: String,
		required: true
	},
	correo: {
		type: String,
		required: true,
		lowercase: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	ciudad_residencia: {
		type: String,
		required: true
	},
	telefono:{
		celular: {
			type: Number,
			required: true
		},
		codigo_area:{
			type: String,
			required: true
		}
	},
	ci: {
		type: Number,
		required: true	
	},
	_dispositivos: [{
		type: Schema.Types.ObjectId,
		ref: 'Dispositivo'
	}],
	fecha_creacion: {
		type: Date,
		default: Date.now
	},
	fecha_actualizacion: {
		type: Date,
		default: null
	},
});
const UsuarioModel = mongoose.model('Usuario', UsuarioSchema);
module.exports = UsuarioModel;