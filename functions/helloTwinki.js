//http://localhost:8888/.netlify/functions/hello

exports.handler = async function(event, context){
  const body = JSON.parse(event.body, { binary: true });

  console.log(body);
  return {
    statusCode: 200,
    body: JSON.stringify(body),
  };
};

//https://example.com/.netlify/functions/my-function?id=123
