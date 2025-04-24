const fs = require('fs');
const http = require('http');
const superagent =require('superagent');



const readFilePro = file => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if(err) reject('i could not find that file')
            resolve(data);
        });
    });
};

const writeFilePro = (file, data) =>{
    return new Promise((resolve, reject)=> {
        fs.writeFile(file, data, err =>{
            if(err) reject('could not find the file');
            resolve('success');
        })
    })
}

const getDogPic = async () => {
    try{
 const data =  await readFilePro(`${__dirname}/starter/dog.txt`);
  console.log(`Breed: ${data}`);

  const res = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
   console.log(res.body.message);

   await writeFilePro('dog-img.txt', res.body.message);
    console.log('random dog image saved to file');
    }catch(err){
        console.log('Err');
        
    }
   
    throw(err);
     return '2:ready';
};
console.log('will get dog pics');

getDogPic(). then( x => {
console.log(x);
})


console.log('done getting dog pics');