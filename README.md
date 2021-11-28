# Infraestrutura como código com AWS CDK usando typescript

<img
    src="https://storage.googleapis.com/golden-wind/experts-club/capa-github.svg"
/>

## Minhas observações extras

Esse código foi "forkado" por mim somente para fins de aprendizado e para que eu possa adicionar comentários. Abaixo segue o conteúdo original do criado do conteúdo.

## Descrição original do criado do código

Olá, nesse projeto nós realizamos a implementação de uma estrutura básica de serviços da AWS utilizando o AWS CDK, o AWS CDK é um "framework" criado e mantido pela AWS com o proposito de trazer a definição de infraestrutura como código mais próxima da sua linguagem de programação favorita, tornando assim a sua experiência mais divertida. Apresentado por [Bruno Russi Lautenschlager][1].

## Instalação

### Pre-requisitos

- [AWS CLI](https://aws.amazon.com/pt/cli/);
- [Node.js](https://nodejs.org/en/);
- [Npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) ou [Yarn](https://yarnpkg.com/getting-started/install);
- [TypeScript](https://www.typescriptlang.org/download);
- [AWS CDK](https://docs.aws.amazon.com/cdk/latest/guide/getting_started.html#getting_started_install);

### Libs do AWS CDK

Essas são as libs instaldas no projeto para adicionar mais serviços a nossa stack, na documentação abaixo além de encontrar todos os erviços suportados temos a lista de parametros suportados. ex: lambda (`@aws-cdk/aws-lambda`), api-gateway (`@aws-cdk/aws-apigateway`), s3 (`@aws-cdk/aws-s3`), etc.

- [API Reference](https://docs.aws.amazon.com/cdk/api/latest/docs/aws-construct-library.html)

## Comandos utilizados

 Criando o projeto

- `cdk init app --language typescript`

### Configurando o primeiro deploy

Isso daqui é necessário no primeiro deploy que você for fazer. Ele cria uma cloudformation e um bucket para armazenar alguns códigos. Entre no menu da CloudFormation na AWS para você ver o que ele criou. Entre na Stack CDKToolkit e veja os eventos (para ver o que ele fez). Vá para resources e veja que ele criou um S3 e uma policy de S3 que serve para permitir o acesso ao S3. Ele cria esse S3 para fazer o deploy de código temporários necessários.
- `cdk bootstrap`

### Visualizando as diferenças

Mostra o que ficará de diferente na nossa conta da AWS assim que demos um deploy. Ou seja, qual recurso deverá ser criado.
- `cdk diff`

### Gerando o cloud formation

Esse comando gerar (mostra) um código de CloudFormation que o que realmente será enviado para a AWS para criar a nossa Infra.
- `cdk synth`

### Realizando o deploy na AWS

- `cdk deploy`

### Destuindo a infraestrutura
Transforma o nosso código em cloudformation e aplica na AWS.
- `cdk destroy`

## Expert

| [<img src="https://github.com/brunoxd13.png" width="75px">][1] |
| :-: |
|[Bruno Russi Lautenschlager][1]|

[1]: https://linktr.ee/bruno_russi
