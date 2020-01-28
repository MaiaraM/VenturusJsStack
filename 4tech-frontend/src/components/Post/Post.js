import React from 'react';
import { Grid, Paper, Typography } from '@material-ui/core';
import { AccountCircle, Favorite } from '@material-ui/icons';

import './Post.css';

const Post = () =>{
 
    return (
        <Grid className="grid-post" item xs={12}>
            <Paper className="paper">
                <div className="user">
                     <AccountCircle/>
                     <Typography className="username" variant="subtitle2"></Typography>
                </div>
                <img className="image" alt="post" src='https://pleno.news/wp-content/uploads/2019/09/plenonews_69429078_424547198412357_2917137491588994799_n-1024x684.jpg'/>
                <section className="body">
                    <div className="like">
                        <Typography className="people" variant="body2">Like by 10</Typography>
                        <Favorite />
                    </div>
                    <div className="comments">

                    </div>
                </section>
                <hr />
            </Paper>
        </Grid>

    )
  
}

export default Post;