#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { AwsCdkInfraTsStack } from '../lib/aws-cdk-infra-ts-stack';

// Projeto é inicializado aqui. Para saber mais sobre o CDK veja o readme deste projeto.
// Lembrando que tem que criar um acesso programático (usuário com suas security credentials) para acessar os recursos da AWS via AWS CLI:
// aws configure para inserir a access key id e a secret key id (veja na Internet o passo a passo que é sempre igual)
const app = new cdk.App();
new AwsCdkInfraTsStack(app, 'AwsCdkInfraTsStack', {
  /* If you don't specify 'env', this stack will be environment-agnostic.
   * Account/Region-dependent features and context lookups will not work,
   * but a single synthesized template can be deployed anywhere. */

  /* Uncomment the next line to specialize this stack for the AWS Account
   * and Region that are implied by the current CLI configuration. */
  // env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },

  /* Uncomment the next line if you know exactly what Account and Region you
   * want to deploy the stack to. */
  // env: { account: '123456789012', region: 'us-east-1' },

  /* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
});
