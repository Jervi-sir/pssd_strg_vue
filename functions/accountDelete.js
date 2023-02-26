const mysql = require('mysql2/promise');

//http://localhost:8888/.netlify/functions/accountDelete?id=1&user_id=sdf-qwe2-eqw5-%26sdf-ersdf

exports.handler = async function(event, context) {
  const { id, user_id } = event.queryStringParameters;
  try {
    const connection = await mysql.createConnection({
      host: 'aws-eu-west-2.connect.psdb.cloud',
      port: 3306,
      user: 'ro0hpmd68r8lczkiy0s4',
      password: 'pscale_pw_FDq4pMGf9Byg7ff0cAH4MOEwAwv7ASDkFBJxhKjPMpR',
      database: 'pssd_strg',
      ssl: {
        rejectUnauthorized: true,
      },decodeURIComponent
    });

    const [rows] = await connection.query(`DELETE FROM accounts WHERE id = '${id}' AND user_id = '${user_id}';`);
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

