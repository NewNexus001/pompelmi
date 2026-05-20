const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
const form = new FormData();
form.append('document', fs.createReadStream('test_virus.php'));
axios.post('http://localhost:3000/upload', form, {
  headers: form.getHeaders()
}).then(res => console.log('Response:', res.data))
  .catch(err => console.error('Error:', err.response ? err.response.data : err.message));
