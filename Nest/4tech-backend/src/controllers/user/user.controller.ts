import { Controller, Get, Post, Body, BadRequestException } from '@nestjs/common';
import { get } from 'http';
import { UserService } from 'src/services/user/user.service';
import { UserViewModel } from 'src/domain/user.viewmodel';

@Controller('users')
export class UserController {
    
    constructor(private userService: UserService){ }

    @Get()
    getUser(){
        return this.userService.getUsers();
    }

    @Post()
    createUser(@Body() newUser: UserViewModel){
        const userList  = this.userService.getUsers();

        const findUser = userList.find(user => user.userName === newUser.userName);
        if(findUser){
            throw new BadRequestException('this userName already exists')
        }

    
        return this.userService.createNewUser(newUser);
    }

}
