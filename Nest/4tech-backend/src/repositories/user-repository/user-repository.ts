import { Injectable } from '@nestjs/common';
import { UserViewModel } from 'src/domain/user.viewmodel';

@Injectable()
export class UserRepository{

    db: UserViewModel[] = [
        new UserViewModel('joão', 'jb', '123mudar'),
        new UserViewModel('maiara', 'mama', '123456')
    ];

    getUsers(){
        return this.db;
    }

    createUser(newUser: UserViewModel){
        this.db.push(newUser);
        return newUser;
    }

    deleteUserByName(userLogin: String){
        this.db.forEach((item, index) => {
             if(item.userLogin === userLogin) this.db.splice(index,1);
            }
        )

        return this.db;
    }
}
