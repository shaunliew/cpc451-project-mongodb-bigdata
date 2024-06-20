# CPC451 Big Data Project

## Services Used

MongoDB Atlas Serverless Cluster

## Folder Structure

```bash
.
├── README.md
├── atlas_result (the explain method results JSON files for running the queries in MongoDB Atlas)
├── dataset.csv (the input data)
├── import_data.js (js file to import the data into Stand Alone MongoDB)
├── import_data_atlas.js (js file to import the data into MongoDB Atlas)
├── localhost_result (the explain method results JSON files for running the queries in Stand Alone MongoDB at LocalHost)
├── queries_files (the `.mongodb.js` files that contains all the queries)
└── queries_result (the queries output JSON files)

```

## Connect LocalHost MongoDB

## Connect Serverless MongoDB Atlas Cluster

## Import Data

Download the [Full TMDB Movies Dataset 2024 CSV File](https://www.kaggle.com/datasets/asaniczka/tmdb-movies-dataset-2023-930k-movies) into your local machine.

make sure you download `MongoDB for VS Code` extension

connect your cluster using connection string.

```node
node <file_name>.js
```

## Run the Queries using [MongoDB Playground in VSCode](https://www.mongodb.com/docs/mongodb-vscode/playgrounds/)

open any file that have extension `.mongodb.js` and run it.

### MongoDB Playground
