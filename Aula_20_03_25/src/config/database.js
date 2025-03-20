const { Pool } = require ('pg');
const dotenv = require ('dotenv');
dotenv.config();


// convenção
const pool = new Pool ({
  user: process.env.DB,
  host: process.env.DB_HOST,
  database: process.env.DB_NOME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT

})

module.exports = { pool };
