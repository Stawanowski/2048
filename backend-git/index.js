const express = require('express')
const cors = require('cors') 
const bodyParser = require('body-parser');
require('dotenv').config() 
const { fetchScores, addScore } = require('./lib/score');
const checkAPIKey = require('./lib/middleware')

const app = express() 
const port = 5000

var corsOptionsMain = {
  origin: '*',
  optionsSuccessStatus: 200 
} 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptionsMain)) 

app.get('/fetchScores',  async (req,res) => {

  try{
  const scores = await fetchScores()
  if(scores == 1){
    throw new Error('Fetching failed...')
  }
  res.json(scores).status(200) 
  }catch(err){
    res.status(400).json('Request failed');
  }
})

app.post('/addScore', async(req, res) =>{
  
  try{

    const key = req?.query?.key
    console.log(req.query)
    if(!checkAPIKey(key)){
      res.status(403).json("You're not authorized to do that.")
    }
    
    const response = await addScore(req.query?.name, req.query?.score)
    if(response == 1){
      throw new Error('Request failed')
    }
    res.status(201).json("Score successfully added")

  }catch(Error){
      res.status(400).json('Request failed')
  }
})


app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
