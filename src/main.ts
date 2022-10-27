import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv'
import * as bodyParser from 'body-parser';

dotenv.config()


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(bodyParser.json({limit: '50mb'}));
  app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

  const config = new DocumentBuilder()
    .setTitle('Demo API')
    .setDescription("Caffe Project")
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.APP_PORT);

  console.log("le port de l'applicaqtion est : ", process.env.APP_PORT)
}
bootstrap();
