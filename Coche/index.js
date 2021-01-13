'use strict'
const port = process.env.PORT || 3002;
ggg

const express = require('express');
const logger = require('morgan');
const mongojs= require('mongojs');
const { fstat, fstatSync, fsync } = require('fs');
var db = mongojs("mongodb+srv://adil:966889991@cluster0.d6ppj.mongodb.net/SD?retryWrites=true&w=majority");
const app = express();
var id=mongojs.ObjectID;
//f
//Middleware
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.param('Coche', (req, res, next, Coche) => {
 
console.log('param /Agencia/Coche');

req.collection = db.collection(Coche);
return next();
}); 




 // routes
  app.get('/Agencia', (req, res, next) => {
    console.log('GET /Agencia');
  
    db.getCollectionNames((err, colecciones) => {
    if (err) return next(err);
    res.json({

      result :'OK',
      colecciones : colecciones


    });
    });
    });
    
    
     app.get('/Agencia/:Coche',(req, res, next) => {
     
    
    req.collection.find((err, coleccion) => {
     if (err) return next(err);
    res.json({
      result: 'OK',
      coleccion : req.params.Coche,
      elemento: coleccion


    });
    });
    });
    
    app.get('/Agencia/:Coche/:id',(req, res, next) => {
    
    req.collection.findOne({_id: id(req.params.id)}, (err, elemento) => {
     if (err) return next(err);
     console.log(elemento);
     res.json({
      
      result: 'ok,',
      elemento :elemento
      
      });
     });
    });
    
    app.post('/Agencia/:Coche', (req, res, next) => {
    const elemento = req.body;
    
    if (!elemento.marca) {
     res.status(400).json ({
    error: 'Bad data',
    description: 'Se precisa al menos un campo <marca>'
    });
    } else {
    req.collection.save(elemento, (err, coleccionGuardada) => {
    if(err) return next(err);
    res.json(coleccionGuardada);
    });
    }
    });
    
     app.put('/Agencia/:Coche/:id', (req, res, next) => {
     let elementoId = req.params.id;
     let elementoNuevo = req.body;
    req.collection.update({_id: id(elementoId)},
    {$set: elementoNuevo}, {safe: true, multi: false}, (err, elementoModif) => {
    if (err) return next(err);
    res.json({
      result:'Ok'
    });
    });
    });
    
    app.delete('/Agencia/:Coche/:id', (req, res, next) => {
      console.log("DELETE")
    let elementoId = req.params.id;
    
     req.collection.remove({_id: id(elementoId)}, (err, resultado) => {
     if (err) return next(err);
     res.json(
     {
      result: 'ok'

     }
    );

     });
    });
    
    //Iniciamos la aplicación

    app.listen(port, () => {
      console.log(`API REST ejecutándose en http://localhost:${port}/Agencia/Coche/:id`);
       }); 
