'use strict';
/**
 * Modulos de NodeJS:
 * - express
 * - helmet
 * - body-parser
 * - morgan
 * - fs
 * - connect-multiparty
 * - nodemailer
 * - underscore
 * - bcrypt
 * - path
 * - mongoose
 * - socket.io
 */
const express = require('express');
const app = express();
const helmet = require('helmet'); // Seguridad
app.use(helmet()); // Usando el middleware Helmet para seguridad , que bloquea Headers HTTP
const bodyParser = require('body-parser'); // Permite manejar los requests en formato json
const morgan = require('morgan'); // Permite loggear la actividad del servidor en la consola
const fs = require('fs'); // Realizar operaciones con el filesystem
const multiparty = require('connect-multiparty'); // Permite subir archivos
const nodemailer = require('nodemailer'); // Mandar correos electronicos
const _ = require('underscore');
const bcrypt = require('bcrypt-nodejs'); // Permite generar hashes para las contraseñas 
const path = require('path'); // Funciones de rutas absolutas
const mongoose = require('mongoose'); // ODM de MongoDB
mongoose.Promise = global.Promise; // Utilizando el sistema de promesas para mongoose
app.use('/public', express.static(path.join(__dirname, 'public')));
// Loggear los requests de la aplicacion en un archivo
const accessLogStream = fs.createWriteStream(path.join(__dirname, '/logs/access.log'), {flags: 'a'});
app.use(morgan('dev', {stream: accessLogStream})); // Loggea en la consola la actividad de la aplicacion, para debbuging y requests
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json()); // Habilitar requests de tipo JSON

/**
 * 
 */
mongoose.connect('mongodb://localhost:27017/4track', function(err){
	if(err) throw err;
	else console.log('Conectado a MongoDB');
});
/**
 * Importando modelos
 */
const usuarioModel = require('./models/usuario-model');
/**
 * Importando rutas
 */
const usuario = require('./routes/usuario');
const login = require('./routes/login');
/**
 * Definiendo rutas publicas
 * @type {[type]}
 */
const publicApiRoutes = express.Router();

publicApiRoutes.post('/usuario', function(req, res, next){
	usuario.nuevoUsuario(req, res, usuarioModel, bcrypt);	
});
publicApiRoutes.post('/login', function(req, res, next){
	login.iniciarSesion(req, res, usuarioModel, bcrypt);
});

app.use('/api/v1', publicApiRoutes); 

app.all('/*', function(req, res, next){
	// Mostrando el documento index.html, en cualquier url dada
    res.sendFile(path.join(__dirname, '/public/app/index.html'));
});

const server = app.listen(8080);
const io = require('socket.io')(server);
