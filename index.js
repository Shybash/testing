const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pool = require('./config/db'); 
const companyRouter = require('./routers/Company');
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/api', companyRouter); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
