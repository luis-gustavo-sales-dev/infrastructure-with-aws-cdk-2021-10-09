import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as AwsCdkInfraTs from '../lib/aws-cdk-infra-ts-stack';

// Essa daqui é a parte de testes como um teste qualquer de nossos programas. A diferença é que aqui ele verifica se de fato a nossa infraestrutura foi criada
test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new AwsCdkInfraTs.AwsCdkInfraTsStack(app, 'MyTestStack');
    // THEN
    // Aqui que ele verifica se a infraestrutura foi de fato criada
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
