import { Controller, UseGuards, Post, UseInterceptors, UploadedFile, Body, Get, Param, Delete, Put, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserActivityService } from 'src/services/user-activity/user-activity.service';
import { LikeDislikeViewModel } from 'src/domain/schemas/like-dislike.viewmodel';

@UseGuards(AuthGuard('jwt'))
@Controller('user-activity')
export class UserActivityController {
    constructor(private readonly userActivityService: UserActivityService) {}

    @Post('/:userId/post')
    @UseInterceptors(
        FileInterceptor('image', {
            storage: diskStorage({
                destination: '../images/',
                filename: (req, file, callback) => {{ callback(null, file.originalname);}}
            }),
        }),
    )
    postImage(@UploadedFile() file,@Param('userId') userId: string, 
                @Body('description') description: string, ) {
        return this.userActivityService.uploadImage(userId, file.originalname, description);
    }

    @Get('/:userId/post')
    getUserPosts(@Param('userId') userId: string, @Query('page') page) {
        return this.userActivityService.getAllPostByUser(userId, page);
    }

    @Get('/post/:postId')
    getPostById(@Param('postId') postId: string) {
        return this.userActivityService.getPostById(postId);
    }

    @Get(':index')
    getRecentImages(
        @Param('index') index: string) {
        return this.userActivityService.getRecentUploads(index);
    }

    @Delete('/:userId/post/:id')
    deletePost(@Param('id') id: string,@Param('userId') userId: string){
        return this.userActivityService.deletePost(userId,id);
    }

    @Put('like-dislike')
    likeOrDislikeUserActivity(@Body() likeDislike :LikeDislikeViewModel){
        return this.userActivityService.likeDislikeUserActivity(likeDislike);
    }

}
