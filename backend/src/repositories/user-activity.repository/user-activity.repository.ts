import { Injectable, Put, Body } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { UserActivity } from "src/domain/schemas/user-activity.schema";
import { Model } from 'mongoose';
import { UserActivityDto } from "src/domain/dto/user-activity.dto";
import { UserActivityService } from "src/services/user-activity/user-activity.service";

@Injectable()
export class UserActivityRepository{
    constructor(
        @InjectModel('UserActivity') private readonly userActivityColletion: Model<UserActivity>
    ){}

    async getById(id: string) : Promise<UserActivity>{
        return this.userActivityColletion
                .findOne({_id:id})
                .lean();
    }

    async getByUserId(id: string, index :number) : Promise<UserActivity>{
        return this.userActivityColletion
                .find({userId:id})
                .sort({timestamp : -1})
                .skip(index)
                .limit(10)
                .lean();
    }

    async getPaged(index:number){
        return await this.userActivityColletion
                    .find()
                    .sort({timestamp : -1})
                    .skip(index)
                    .limit(10)
                    .lean();
    }

    async create(userActivityDto :UserActivityDto){
        const newUserActivity = this.userActivityColletion(userActivityDto);
        return await newUserActivity.save();
    }

    async deletePost(userId:string, id : string){
        const post = this.userActivityColletion.findOne({_id:id, userId: userId});

        const deltePost = this.userActivityColletion.deleteOne({_id:id});

        return deltePost;
    }

    async update(userActivity :UserActivity){
        const updateActivity = await this.userActivityColletion.findOneAndUpdate(
           {_id : userActivity._id},
           userActivity,
           {new: true});
        return await updateActivity.save();
    }

    
}