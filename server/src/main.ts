import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'https://gogh-v96t-dl1fn4nlb-alijallouls-projects.vercel.app',
  });
  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT ?? 5000);
}

bootstrap();
