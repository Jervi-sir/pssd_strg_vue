const mysql = require('mysql2/promise');

//http://localhost:8888/.netlify/functions/socialAdd?name=jervi

exports.handler = async function(event, context) {
  const { name } = event.queryStringParameters;
  const code = name.toLowerCase();
  const created_at = new Date().toISOString().slice(0, 19).replace('T', ' ');
  const updated_at = new Date().toISOString().slice(0, 19).replace('T', ' ');
  
  try {
    const connection = await mysql.createConnection({
      host: 'aws-eu-west-2.connect.psdb.cloud',
      port: 3306,
      user: 'ro0hpmd68r8lczkiy0s4',
      password: 'pscale_pw_FDq4pMGf9Byg7ff0cAH4MOEwAwv7ASDkFBJxhKjPMpR',
      database: 'pssd_strg',
      ssl: {
        rejectUnauthorized: true,
      },
    });

    const [rows] = await connection.query(`INSERT INTO socials (name, code, created_at, updated_at) VALUES  ('${name}', '${code}', '${created_at}', '${updated_at}');`);
    return {
      statusCode: 200,
      body: JSON.stringify(rows),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: 'Internal server error',
    };
  }
};

