const express = require('express');
const mysql = require('mysql2');
require('dotenv').config();

const dbUsername = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;

const port = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded( { extended:false }));
app.use(express.json());

const db = mysql.createConnection(

)