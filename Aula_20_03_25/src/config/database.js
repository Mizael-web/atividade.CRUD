const { Pool } = require ('pg');
const dotenv = require ('dotenv');
dotenv.config();


// convenção
const pool = new Pool ({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORTA

})

<<<<<<< HEAD
module.exports = pool;
=======
module.exports = pool;
>>>>>>> 820fe92d3eae7c8848937d2d999cbbcfe08053f4
