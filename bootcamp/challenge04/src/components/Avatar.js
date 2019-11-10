import React from 'react';

import '../css/Avatar.css';

function Avatar({ src, title }) {
  return <div className="avatar"><img src={src} alt={title} title={title} className="img" /></div>;
}

export default Avatar;