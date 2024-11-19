const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;


app.use(cors());


const getData = () => {
  const rawData = fs.readFileSync(path.join(__dirname, 'data.json'));
  return JSON.parse(rawData).users;
};


const filterData = (data, query) => {
  let filteredData = [...data];


  if (query.role) {
    filteredData = filteredData.filter(item => 
      item.role.toLowerCase() === query.role.toLowerCase()
    );
  }


  if (query.department) {
    filteredData = filteredData.filter(item => 
      item.department.toLowerCase() === query.department.toLowerCase()
    );
  }


  if (query.location) {
    filteredData = filteredData.filter(item => 
      item.location.toLowerCase() === query.location.toLowerCase()
    );
  }


  if (query.minAge) {
    filteredData = filteredData.filter(item => 
      item.age >= parseInt(query.minAge)
    );
  }


  if (query.maxAge) {
    filteredData = filteredData.filter(item => 
      item.age <= parseInt(query.maxAge)
    );
  }


  if (query.search) {
    const searchTerm = query.search.toLowerCase();
    filteredData = filteredData.filter(item => 
      item.name.toLowerCase().includes(searchTerm) ||
      item.email.toLowerCase().includes(searchTerm)
    );
  }

  return filteredData;
};


app.get('/getData', (req, res) => {
  try {
    const data = getData();
    const filteredData = filterData(data, req.query);
    res.json(filteredData).status(200);
  } catch (error) {
    res.status(500).json({ error: 'Error reading or processing data' });
  }
});


app.get('/', (req, res) => {
  res.send('Server is running');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
