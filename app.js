const fs = require('fs');
const express = require('express');
const app = express();
app.use(express.json());  //middleware

const movies =JSON.parse(fs.readFileSync(`${__dirname}/the-data/movies.json`, 'utf-8'));

app.get('/api/v1/movies', (req, res) => {
    res.status(200).json({
        status: 'success',
        results: movies.length,
        data:{
           movies:movies 
        }

    });
});

app.post('/api/v1/movies', (req, res) =>{
    // console.log(req.body);

    const newId = movies[movies.length -1].id+1;
    const newMovie =Object.assign({id: newId}, req.body);

    movies.push(newMovie);
    fs.writeFile(`${__dirname}/the-data/movies.json`, JSON.stringify(movies), err => {
      res.status(201).json({
        status:'success',
        data: {
            movies:newMovie
        }
      });
    });

});


///////////////////////////////////////////////////////////////
//songs
//////////////////////////////////////////////////////////////
const songs =JSON.parse(fs.readFileSync(`${__dirname}/the-data/songs.json`));

app.get('/api/v1/songs', (req, res) =>{
    res.status(200).json({
        status: 'success',
        results:songs.length,
        data:{
            songs
        }
    });
});


app.post('/api/v1/songs', (req, res) =>{
    const newId = songs[songs.length-1].id+1;  //create a new id
    const newSong =Object.assign({id: newId},req.body); //merge the new id with req.body and save it to newsong
    
    movies.push(newSong); // push newmovie to movies
    fs.writeFile(`${__dirname}/the-data/songs.json`, JSON.stringify(songs), err => {
    res.status(201).json({
        status: 'success',
        data:{
             songs:newSong
        }
    });
    });
});


//////////////////////////////////////////////////////////////
//serieses
//////////////////////////////////////////////////////////////
const serieses = JSON.parse(fs.readFileSync(`${__dirname}/the-data/serieses.json`));

app.get('/api/v1/serieses', (req, res) => {
    res.status(200).json({
        status:'sucess',
        results:serieses.length,
        data:{
            serieses:serieses

        }
    });
});

app.post('/api/v1/serieses', (req, res) => {
const newId = serieses[serieses.length - 1].id + 1;
const newSeries = Object.assign({ id: newId }, req.body);

serieses.push(newSeries)
fs.writeFile(`${__dirname}/the-data/serieses.json`, JSON.stringify(serieses), err => {
    res.status(201).json({
        status:'success',
        data:{
            serieses: newSeries
        }
    });
});


});




const port = 8000;
app.listen(port, () => {
  console.log(`app running on port ${port}......`);
});