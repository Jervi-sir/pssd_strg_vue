const mysql = require('mysql2/promise');

//http://localhost:8888/.netlify/functions/accountUpdate?id=2&user_id=sdf-qwe2-eqw5-%26sdf-ersdf&email=email&password=password&details=details

exports.handler = async function(event, context) {
  
  const { id, user_id, email, password, details } = event.queryStringParameters;
  const updated_at = new Date().toISOString().slice(0, 19).replace('T', ' ');
  
  //check if password got changed
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

    const [result] = await connection.query(`SELECT password, old_password FROM accounts WHERE id = '${id}' AND user_id = '${user_id}';`);
    
    if(password == result[0].password) {
      const [rows] = await connection.query(`UPDATE accounts SET email = '${email}', details = '${details}', updated_at = '${updated_at}' WHERE id = '${id}' AND user_id = '${user_id}';`);
      return {
        statusCode: 200,
        body: JSON.stringify(rows),
      };

    } else {
      let new_old_password = JSON.stringify(result[0].password) + ', ' + JSON.stringify(result[0].old_password);
      const [rows] = await connection.query(`UPDATE accounts SET email = '${email}', password = '${password}', old_password = '${new_old_password}', details = '${details}', updated_at = '${updated_at}' WHERE id = '${id}' AND user_id = '${user_id}';`);
      return {
        statusCode: 200,
        body: JSON.stringify(rows),
      };
    }
   
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: 'Internal server error',
    };
  }
};

