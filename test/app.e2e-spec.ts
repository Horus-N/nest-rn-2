// Make a dataase for testing!
// Everytime we run tests, clean up data
// We must call request like we o with Postman
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
describe('App EndToEnd tests', () => {
  let app: INestApplication;
  beforeAll(async () => {
    const appModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = appModule.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it.todo('should pass !');
  it.todo('should pass 2 !');
});
