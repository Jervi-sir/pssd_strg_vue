const mysql = require('mysql2/promise');

//http://localhost:8888/.netlify/functions/accountAdd?email=email@email.com&password=password&details=details&social_id=1&user_id=sdf-qwe2-eqw5-%26sdf-ersdf

exports.handler = async function(event, context) {
  const { email, password, details, social_id, user_id } = event.queryStringParameters;
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
      },decodeURIComponent
    });

    const [rows] = await connection.query(`INSERT INTO accounts (social_id, email, password, old_password, details, user_id , created_at, updated_at) VALUES  ('${decodeURIComponent(social_id)}', '${decodeURIComponent(email)}', '${decodeURIComponent(password)}', '', '${decodeURIComponent(details)}', '${(user_id)}', '${created_at}', '${updated_at}');`);
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

