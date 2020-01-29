import { Injectable, BadRequestException } from '@nestjs/common';
import { UserRepository } from 'src/repositories/user-repository/user-repository';
import { UserActivityDto } from 'src/domain/dto/user-activity.dto';
import { UserActivityCommentDto } from 'src/domain/dto/user-activity-comment.dto';
import { UserActivityRepository } from 'src/repositories/user-activity.repository/user-activity.repository';
import { UserActivity } from 'src/domain/schemas/user-activity.schema';
import { readdirSync, readFileSync } from 'fs';
import { LikeDislikeViewModel } from 'src/domain/schemas/like-dislike.viewmodel';

@Injectable()
export class UserActivityService {

    constructor(
        private readonly userRepository: UserRepository,
        private readonly userActivityRepository: UserActivityRepository
    ) { }

    async getPostById(postId: string){
        const userActivity = await this.userActivityRepository.getById(postId);
        if(!userActivity){throw new BadRequestException('Invalid postId')};
        return userActivity;
    }

    async getAllPostByUser(userId: string, index :string) {
        const indexAsNumber = parseInt(index, 10);
        if(isNaN(indexAsNumber)){throw new BadRequestException('Invalid index')}

        const user = await this.userRepository.getById(userId);;
        if(!user){throw new BadRequestException('Invalid userId')};

        return await this.userActivityRepository.getByUserId(userId, indexAsNumber); ;
    }

    async getRecentUploads(index: string) {
        const indexAsNumber = parseInt(index, 10);
        if(isNaN(indexAsNumber)){throw new BadRequestException('Invalid index')}

        const recentsUpdate = await this.userActivityRepository.getPaged(indexAsNumber);

        return this.convertImageBase64(recentsUpdate) ;
    }

    async uploadImage(userId: string, filename: string, description: string) {
        const user = await this.userRepository.getById(userId);

        if (!user) { throw new BadRequestException(`This user does not exist`) }

        const uploadImageObj = new UserActivityDto(userId, filename, user.userName);

        if (description) {
            uploadImageObj.comments.push(new UserActivityCommentDto(
                userId,
                user.userName,
                description,
            ));
        }

        return await this.userActivityRepository.create(uploadImageObj);
    }

    async deletePost(userId: string, id: string){
        return await this.userActivityRepository.deletePost(userId,id);
    }

    convertImageBase64(userActivities: UserActivity[]){
        return Promise.all(
            userActivities.map( userActivity => {
                return {
                    ...userActivity,
                    imgEncoded: readFileSync(`../images/${userActivity.fileName}`, 'base64'),
                }
            })
        )
    }

    async likeDislikeUserActivity(likeDislikeViewModel: LikeDislikeViewModel){
        const userActivity = await this.userActivityRepository.getById(likeDislikeViewModel.userActivityId);
        if (!userActivity) { throw new BadRequestException(`This user-activity does not exist`) }

        const user = await this.userRepository.getById(likeDislikeViewModel.userId);
        if (!user) { throw new BadRequestException(`This user does not exist`) }

        userActivity.likes.includes(user._id.toString()) ? userActivity.likes = userActivity.likes.filter(l => l !== user._id.toString()) : userActivity.likes.push(user._id.toString());

        return this.userActivityRepository.update(userActivity);        
    }

}
