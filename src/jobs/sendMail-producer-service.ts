import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { CreateUserDTO } from 'src/create-user/create-user-dto';

@Injectable()
class SendMailProducerService {
  constructor(@InjectQueue('queue-send-mail') private readonly queue: Queue) {}

  async sendEmail(createUser: CreateUserDTO) {
    await this.queue.add('send-mail-job', createUser); //add createUser to job send-mail-job
  }
}

export { SendMailProducerService };
