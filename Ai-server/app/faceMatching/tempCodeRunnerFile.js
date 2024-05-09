
app.post('/execute-python-script', (req, res) => {
  // Execute the Python script
  exec('python face_controller.py', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing face_controller.py: ${error}`);
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