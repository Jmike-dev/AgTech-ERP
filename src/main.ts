import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('AgTech-ERP API')
    .setDescription(
      'this API is meant handle all request in a medical recorder request for a nurse in an institution ',
    )
    .setVersion('1.0')
    .addTag('Medical recorder')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
