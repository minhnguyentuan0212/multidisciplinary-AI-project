const express = require('express');
const { exec } = require('child_process');

const app = express();
const PORT = 3001;

app.post('/execute-python-script', (req, res) => {
  // Execute the Python script
  exec('python test.py', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing test.py: ${error}`);
      res.status(500).send('Error executing Python script');
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
    res.status(200).send('Python script executed successfully');
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
