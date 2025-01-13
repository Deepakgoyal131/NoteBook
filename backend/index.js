const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors');

connectToMongo();

const app = express()
const port = 5000
         
// app.get('/', (req, res) => {
//   res.send('Hello Deepak !') 
// })  


app.use(cors());
app.use(express.json()); //ise json me deal kar skte he (json me request bhej skte he)

//Availables Routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.listen(port, () => {
  console.log(`iNoteBook backend listening on port ${port}`)
})
