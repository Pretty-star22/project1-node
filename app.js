const fs = require('fs');
const express = require('express');
const app = express();
app.use(express.json());  //middleware



let movies = [
  { id: 1, title: "The Dark Knight", year: 2008, genre: "Action" },
  { id: 2, title: "Inception", year: 2010, genre: "Sci-Fi" },
];

let series = [
  {
    id: 1,
    title: "Stranger Things",
    creator: "The Duffer Brothers",
    genre: "Sci-Fi/Horror",
  },
  {
    id: 2,
    title: "The Crown",
    creator: "Peter Morgan",
    genre: "Historical Drama",
  },
];

let songs = [
  {
    id: 1,
    title: "Bohemian Rhapsody",
    artist: "Queen",
    year: 1975,
    genre: "Rock",
  },
  {
    id: 2,
    title: "Sweet Child O' Mine",
    artist: "Guns N' Roses",
    year: 1987,
    genre: "Rock",
  },
];

app
  .route("/movies")
  .get((req, res) => res.json(movies))
  .post((req, res) => {
    const newId = movies[movies.length - 1].id + 1;
    const newMovie = Object.assign({ id: newId }, req.body);
    movies.push(newMovie);
    res.json(movies);
  })
    .delete((req, res) => {
        const {id} = req.body;
        const index = movies.findIndex(m => m.id === id);
        if (index === -1) return res.status(404).json({error: 'movie not found'});
        movies.splice(index, 1);
        res.json(movies);
    })
    .put((req, res) => {
      const {id, ...updateData} = req.body;
      const index = movies.findIndex(m => m.id === id);
      if (index === -1) return res.status(404).json({err: 'movie not found'});
      movies[index] = {...movies[index], ...updateData };
      res.json(movies);

    });

    app.route('/series')
    .get((req, res) => res.json(series))
    .post((req, res) => {
      const newId = series[series.length-1].id+1;
      const newSeries = Object.assign({id: newId}, req.body);
      series.push(newSeries);
      res.json(series);

    })
    .delete((req, res) => {
      const {id} = req.body;
      const index = series.findIndex(s => s.id === id);
      if(index === -1){
        return res.status(404).json({error:'series not found'});
      };
      series.splice(index, 1);
      res.json(series);
    })
    .put((req, res) => {
      const{id, ...updateData} = req.body;
      const index = series.findIndex(s => s.id === id);
      if(index === -1){
        return res.status(404).json({error:'series not found'});
      }
      series[index] = {...series[index], ...updateData};
      res.json(series);
    });

    app.route('/songs')
    .get((req, res) => res.json(songs))
    .post((req, res) => {
       const newId = songs[songs.length-1].id+1;
       const newSong = Object.assign({id: newId}, req.body);
       songs.push(newSong);
       res.json(songs);
    })
    .delete((req, res) => {
      const {id} = req.body;
      const index = songs.findIndex( s => s.id === id);
      if(index === -1) {
        res.status(404).json({error: 'song not found'})
      };
        songs.splice(index,1)
        res.json(songs)
  
    })
    .put((req, res) =>{
      const {id, ...updateData} = req.body;
      const index = songs.findIndex(s => s.id === id);
      if(id === -1) res.status(404).json({error:'song not found'});
      songs[index] = {...songs[index], ...updateData };
      res.json(songs)
    })

const Port = 3000;
app.listen(Port, () => console.log(`server running on port ${Port}`))

