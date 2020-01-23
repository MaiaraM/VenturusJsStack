 
import { Injectable, BadRequestException } from '@nestjs/common';
import { LoginViewModel } from '../../domain/login.viewmodel';
import { UserService } from '../user/user.service';


@Injectable()
export class AuthService {

    constructor(private userService : UserService){}

    login(login: LoginViewModel) {
        const user = this.userService.attemptLogin(login);

        if(user){
            return 'Authenticated';
        }else{
            throw new BadRequestException("BAD!");
        }
 
    }
}