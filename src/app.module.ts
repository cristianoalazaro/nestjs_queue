import { Module } from '@nestjs/common';
import { CreateUserController } from './create-user/create-user.controller';
import { BullModule } from '@nestjs/bull';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';
import { SendMailProducerService } from './jobs/sendMail-producer-service';
import { SendMailConsumer } from './jobs/sendMail-consumer';

@Module({
  imports: [
    ConfigModule.forRoot(),
    BullModule.forRootAsync({
      useFactory: () => ({
        redis: {
          host: 'localhost',
          port: 6379,
        },
      }),
    }),
    BullModule.registerQueue({
      name: 'queue-send-mail',
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_HOST,
        port: Number(process.env.MAIL_POR),
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
      },
    }),
  ],
  controllers: [CreateUserController],
  providers: [SendMailProducerService, SendMailConsumer],
})
export class AppModule {}
