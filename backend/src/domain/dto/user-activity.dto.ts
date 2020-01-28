import { UserActivityCommentDto } from "./user-activity-comment.dto";


export class UserActivityDto{

    constructor(userId: string, fileName : string, userName: string){
        this.userId = userId;
        this.userName = userName;
        this.fileName = fileName;
        this.likes = [];
        this.comments = [];
        this.timestamp = new Date();
    }

    readonly userId: string;
    readonly fileName: string;
    readonly userName: string;
    readonly timestamp: Date;
    readonly likes: string[];
    readonly comments: UserActivityCommentDto[];
}