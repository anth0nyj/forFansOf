const express = require('express');
const app = express();

// Config
const PORT = 3002;
// Listen
app.listen(PORT, () => {
  console.log('=============================');
  console.log('Server app on port: ', PORT);
  console.log('=============================');
});
