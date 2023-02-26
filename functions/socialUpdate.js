const mysql = require('mysql2/promise');

//http://localhost:8888/.netlify/functions/socialUpdate?id=184&name=jervi

exports.handler = async function(event, context) {
  const { id, name } = event.queryStringParameters;
  const code = name.toLowerCase();
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

    const [rows] = await connection.query(`UPDATE socials SET name = '${name}', code = '${code}', updated_at = '${updated_at}' WHERE id = '${id}';`);
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

