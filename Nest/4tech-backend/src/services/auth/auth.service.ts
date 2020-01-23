 
import { Injectable, BadRequestException } from '@nestjs/common';
import { LoginViewModel } from '../../domain/login.viewmodel';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {

    constructor(private userService : UserService,
        private jwtservice: JwtService){}

    login(login: LoginViewModel) {
        const user = this.userService.attemptLogin(login);

        if(!user){
            throw new BadRequestException("BAD!");
        }

        return {access_token: this.jwtservice.sign({status :"Authorize"})};
 
    }


}