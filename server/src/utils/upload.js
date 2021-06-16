const upload = require('../middlewares/upload');
const Movie = require('../models/movie');
const GridFs = require('../models/gridfs');
const Grid = require('gridfs-stream');
const mongoose = require('mongoose');
const express = require('express');

const router = new express.Router();
const conn = mongoose.connection;
let gfs;

const uploadFile = async (req, res) => {
  try {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('photos'); //collection name
    const aux = await gfs.files.deleteMany({ filename: req.params.id });
    await upload(req, res);
    console.log(req.file);
    if (req.file == undefined) {
      return res.send(`You must select a file.`);
    }
    const movieId = req.params.id;
    const movie = await Movie.findById(movieId);
    //console.log(movie);
    if (!movie) return res.sendStatus(404);
    movie.image = req.params.id;
    //console.log('hola ', movie.image);
    await movie.save();

    return res.send(`File has been uploaded.`);
  } catch (error) {
    console.log(error);
    return res.send(`Error when trying upload image: ${error}`);
  }
};

module.exports = {
  uploadFile: uploadFile,
};
