import { Controller, Get, Post, Body, BadRequestException, Delete, Param, Put , UseGuards } from '@nestjs/common';
import { get } from 'http';
import { UserService } from 'src/services/user/user.service';
import { UserViewModel } from 'src/domain/user.viewmodel';
import { response } from 'express';
import { AuthGuard } from '@nestjs/passport'

@Controller('users')
export class UserController {
    
    constructor(private userService: UserService){ }

    @UseGuards(AuthGuard('jwt'))
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

    @Delete(':userLogin')
    deleteUser(@Param() params){
        return this.userService.deleteUser(params.userLogin);;
    }

    @Put()
    updateUser(@Body() newUser: UserViewModel){
       
    }

}
