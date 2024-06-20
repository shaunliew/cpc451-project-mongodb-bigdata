// MongoDB connection URL
const mongoURL = "mongodb://localhost:27017";

// Database and collection names
const dbName = "movies";
const collectionName = "movie";

// CSV file path
const csvFilePath = "dataset.csv";

// Import the CSV file using mongoimport
const importCommand = `mongoimport --db ${dbName} --collection ${collectionName} --type csv --file ${csvFilePath} --headerline`;

// Execute the import command
const exec = require('child_process').exec;
exec(importCommand, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error executing import command: ${error}`);
    return;
  }
  console.log(`CSV file imported successfully. Output: ${stdout}`);
});