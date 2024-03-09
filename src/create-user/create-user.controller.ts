import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO } from './create-user-dto';
import { SendMailProducerService } from 'src/jobs/sendMail-producer-service';

@Controller('createuser')
export class CreateUserController {
  constructor(private readonly sendMailService: SendMailProducerService) {}

  @Post()
  async createUser(@Body() createUser: CreateUserDTO) {
    this.sendMailService.sendEmail(createUser);
    return {
      user: {
        email: createUser.email,
        name: createUser.name,
      },
    };
  }
}
