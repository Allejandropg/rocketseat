import React, { Component } from 'react';

import Post from './Post';
import posts from '../assets/posts.json';

import '../css/Posts.css';

class PostList extends Component {
  state = {
    newTech:'',
    posts:posts
  }

  render(){
    return (
      <div className="posts">
        {this.state.posts.map(post => <Post key={post.id} post={post}  />)}
      </div>
    );
  }

}

export default PostList;