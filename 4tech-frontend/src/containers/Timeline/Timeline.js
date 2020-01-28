import React from 'react';
import Header from '../../components/Header/Header';
import Post from '../../components/Post/Post';
import { Container } from '@material-ui/core';

import './Timeline.css'

const Timeline = () => {
    return (
        <>
          <Header />  
          <Container className='timeline'>
          <Post/>
          </Container>
         
        </>
    );
};

export default Timeline;