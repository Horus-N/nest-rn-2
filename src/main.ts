import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

/** How to generate a module
 *  nest g(generate) module "module name"
 * we have 2 entities: User and NOte, 1 User can write many Notes
 * Controller is where to receive request from client
 * controller will call service to do the business logic (implementation)
 *
 * prisma = dependency which connect to db using ORM(object relation mapping)
 * how to show db data in broser
 * npx prisma studio
 *
 * Now add a module named "prisma"
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 9000);
  console.log(`Server is running on port ${process.env.PORT ?? 9000}`);
}
bootstrap();
