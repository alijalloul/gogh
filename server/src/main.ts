import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  app.enableCors({
    origin: [
      'https://gogh-v96t-dl1fn4nlb-alijallouls-projects.vercel.app',
      'http://localhost:3000',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS ',
    allowedHeaders: 'Authorization, Content-Type',
  });
  await app.listen(process.env.PORT ?? 5000);
}

bootstrap();
