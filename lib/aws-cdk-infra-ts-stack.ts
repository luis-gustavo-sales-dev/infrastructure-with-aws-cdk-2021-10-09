import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
import * as lambda from '@aws-cdk/aws-lambda';
import * as apigw from '@aws-cdk/aws-apigateway';
import * as dynamo from '@aws-cdk/aws-dynamodb';

// O código para criação da infraestrutura fica aqui
// O que criaremos aqui é uma lambda (servless) com um api-gateway para acesso e um DynamoDB para armazenar os recursos manipulados pela lambda.
// IMPORTANTE: se quiser limpar todo o seu ambiente criado anteriormente através desse script, basta limpar todo o código dentro do construtor (só não remova o super é claro) e dê cdk deploy. Cuidado que algumas coisas ficam lá assim mesmo como por exemplo se tiver dados em um S3.
export class AwsCdkInfraTsStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Isso é um construtor do bucket
    // o this possui as credencias
    // ExpertsClubS3 é o nome do bucket
    // versioned quer dizer que o bucket criado vai ser versionado
    // Se quiser renomear um S3 já criado basta alterar o nome aqui que ele já altera sozinho. Lembrando que renomear um S3 significa apagar o antigo e criar um novo.
    // Faça o teste: altere o nome aqui, de o cdk diff e se quiser fazer o deploy dê o cdk deploy
    new s3.Bucket(this, 'ExpertsClubS3', {
      versioned: true
    })
    
    // Cria um recurso de DynamoDB
    // Cria uma tabela chamada expertsclub-dynamo
    // partionKey é uma coluna na tabela que se chama path no nosso caso
    // A definição da tabela  tem que ficar aqui primeiro
    const dynamoTable = new dynamo.Table(this, 'ExpertsClub-Dynamo', {
      partitionKey: {
        name: "path",
        type: dynamo.AttributeType.STRING
      }
    })

    // Criação de uma função lambda
    const lambdaExperts = new lambda.Function(this, 'ExpertsClubLambda', {
      // Aqui definimos as props
      // Linguagem da lambda
      runtime: lambda.Runtime.NODEJS_14_X,
      // O código da lambda ficam em ./lambda
      code: lambda.Code.fromAsset('lambda'),
      // Função que é chamada quando a lambda é chamada (veja o código em ./lambda/index.js)
      handler: 'index.handler',
      // 
      environment: {
        // Aqui é definido as variávies de ambiente para a lambda poder usar.
        // Veja no código do index.js que tem lá o uso da variável TABLE_NAME que é definida aqui
        TABLE_NAME: dynamoTable.tableName
      }
    })

    // permite o acesso da lambda a tabela do dynamo
    dynamoTable.grantReadWriteData(lambdaExperts)
    
    // Aqui cria uma api-gateway pronto para lambda (ele já cria tudo (outros recursos) para uma api gateway pronto para lambda)
    // O Api gateway gateway vai chamar a lambda definida em lambdaExperts
    // Agora você vai poder chamar a lambda através da URL (que é mostrada na tela após dar o cdk deploy). Veja a tela do ApiGateway para você ver (veja o stage e o resource para ver o que foi feito automaticamente).
    new apigw.LambdaRestApi(this, 'ExpertsClubAPI-GW', {
      handler: lambdaExperts
    })
  }
}
