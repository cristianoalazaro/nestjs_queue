import { MailerService } from '@nestjs-modules/mailer';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { CreateUserDTO } from 'src/create-user/create-user-dto';

@Processor('queue-send-mail')
class SendMailConsumer {
  constructor(private readonly mailService: MailerService) {}

  @Process('send-mail-job')
  async sendMailJob(job: Job<CreateUserDTO>) {
    const { data } = job;

    await this.mailService.sendMail({
      to: data.email, // list of receivers
      from: 'TESTE QUEUE PROJECT <test@test.com>', // sender address
      subject: 'SEJA BEM VINDO(A)', // Subject line
      text: `Olá ${data.name}, seu cadastro foi realizado com sucesso.`, // plaintext body
    });
  }
}

export { SendMailConsumer };
