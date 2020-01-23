import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/repositories/user-repository/user-repository.';
import { UserViewModel } from 'src/domain/user.viewmodel';
import { LoginViewModel } from 'src/domain/login.viewmodel';


@Injectable()
export class UserService {

    constructor(readonly userRepository: UserRepository){}

    getUsers(){
        return this.userRepository.getUsers();
    }

    createNewUser(newUser: UserViewModel){
        return this.userRepository.createUser(newUser);
    }

    attemptLogin(login: LoginViewModel){
        const userList = this.userRepository.getUsers();
       

        const found = userList.find( u => u.userLogin == login.userLogin &&  u.password === login.password);
       
        return found;
    }

    deleteUser(userLogin: String){
         return this.userRepository.deleteUserByName(userLogin);
    }

}


