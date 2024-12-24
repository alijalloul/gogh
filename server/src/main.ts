import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'https://gogh-v96t-dl1fn4nlb-alijallouls-projects.vercel.app', // replace with the actual frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS', // include OPTIONS method
    allowedHeaders: 'X-Requested-With, Content-Type, Authorization', // make sure to include any custom headers
    credentials: true,
  });
  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT ?? 5000);
}

bootstrap();
