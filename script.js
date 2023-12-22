const express = require('express'),
  app = express(),
  fs = require('fs'),
  os = require("os"),
  shell = require('shelljs'),
  folderPath = './Responses',
  defaultFileExtension = 'csv',
  path = require('path');

// Create the folder path in case it doesn't exist
shell.mkdir('-p', folderPath);

app.use(express.json());

app.get('/', (req, res) => res.send('Hello, I write data to file. Send them requests!'));

app.post('/write', (req, res) => {
  const { fileName, iteration, data } = req.body;
  const filePath = `${path.join(folderPath, fileName)}.${defaultFileExtension}${os.EOL}`;

  try {
    if (iteration == "0") {
      // Write the table header
      fs.appendFileSync(filePath, `Search term,Suggestion${os.EOL}`, "utf8");
    }
    fs.appendFileSync(filePath, `${data}${os.EOL}`, "utf8");
    res.send("Success");
  } catch (err) {
    console.log(err);
    res.send("Error", err);
  }
});

app.listen(3000, () => {
  console.log('ResponsesToFile App is listening now! Send them requests my way!');
  console.log(`Data is being stored at location: ${path.join(process.cwd(), folderPath)}`);
});