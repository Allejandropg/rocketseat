import React from 'react';

// Css
import '../css/Post.css';

// Components
import Avatar from './Avatar';
import Comment from './Comment';

function Post({ post }) {
  console.log('post',post)
  const { content, date } = post;
  const { avatar, name } = post.author;
  return (
    <>
      <div className="post">
        <div className="infos">
            <Avatar src={avatar} title={name} />
            <div className="author">
              <p className="name-author"><b>{name}</b>
              <span className="post-date">{date}</span></p>
            </div>
        </div>
        <p className="content">{content}</p>
        <hr/>
        {post.comments.map(comment => <Comment key={comment.id} comment={comment} />)}
        
      </div> 
    </>  
  );
}

export default Post;