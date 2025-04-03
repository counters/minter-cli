import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {CommandFactory} from "nest-commander";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await app.listen(process.env.PORT ?? 3000);
    await CommandFactory.run(AppModule);
}

bootstrap();
