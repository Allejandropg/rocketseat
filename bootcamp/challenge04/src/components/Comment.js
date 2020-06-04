import React from 'react';

import Avatar from './Avatar';

import '../css/Comment.css';

function Comment ({ comment }){
  // console.log('comment',comment);
  const { content } = comment;
  const { name, avatar } = comment.author;
  return (
    <> 
      <div className="comment">
          <Avatar src={avatar} title={name} />
          <div className="infos-comment">
            <b className="author-comment">{name}</b>
            <span className="content-comment">{content}</span>
          </div>
      </div>
    </>
  );
}
export default Comment
