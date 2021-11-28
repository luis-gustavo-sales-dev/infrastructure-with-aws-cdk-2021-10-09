const { DynamoDB } = require('aws-sdk');

// Essa função é chamada
exports.handler = async function (event) {
  const dynamo = new DynamoDB();

  console.log("request:", JSON.stringify(event, undefined, 2));

  // update dynamo entry for "path" with hits++
  // Atualiza um dado na tabela do no dynamoDB
  // Salva quantas vezes essa lambda é visitada
  await dynamo.updateItem({
    // Veja que essa tabela aqui tem que ser definida nas variáveis de ambiente na infraestrutura
    TableName: process.env.TABLE_NAME,
    Key: { path: { S: event.path } },
    UpdateExpression: 'ADD hits :incr',
    ExpressionAttributeValues: { ':incr': { N: '1' } }
  }).promise();

  // Isso daqui retorna um código 200 e diz qual é o caminho (URL)
  return {
    statusCode: 200,
    headers: { "Content-Type": "text/plain" },
    body: `Hello, CDK! You've hit ${event.path}\n`,
  };
};
