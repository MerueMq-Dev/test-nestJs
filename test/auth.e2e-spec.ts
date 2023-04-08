import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { disconnect } from 'mongoose';
import { AppModule } from '../src/app.module';
import { AuthDto } from 'src/auth/dto/auth.dto';
import * as request from 'supertest';

describe('AuthController (e2e)', () => {
	let app: INestApplication;
	const loginDto: AuthDto = {
		"login": "a@a.ru",
		"password": "12345"
	}

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});


	it('/auth/login (POST) — success', (done) => {
		request(app.getHttpServer())
			.post('/auth/login')
			.send(loginDto)
			.expect(200).then(({ body }: request.Response) => {
				expect(body).toHaveProperty('access_token');
				done()
			})
	});


	it('/auth/login (POST) — fail', () => {
		return request(app.getHttpServer())
			.post('/auth/login')
			.send({
				login: "a@a.ru",
				password: "1"
			})
			.expect(401, {
				statusCode: 401,
				message: "Пользователь с таким email или паролем не найден",
				error: "Unauthorized"
			})
	});

	afterAll(() => {
		disconnect();
	});

})