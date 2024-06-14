const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pool = require('./config/db'); 
const companyRouter = require('./routers/Company');
const app = express();

app.use(bodyParser.json());

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true, 
  };
  app.use(cors(corsOptions));
app.use('/api', companyRouter); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
