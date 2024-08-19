import React from 'react';
import './IconButtonStyle.css'
import gitHubIcon from 'F:/Algolizer/GS_Visualizer/src/assets/githubIcon.png'
import videoIcon from 'F:/Algolizer/GS_Visualizer/src/assets/videoIcon.png'
function IconButtons() {
  const handleVideoClick = () => {
    console.log('Video button clicked');
  };

  const handleGitHubClick = () => {
    console.log('GitHub button clicked');
  };
  return (
    <div className='iconsDiv'>
      <button className='video ' onClick = {handleVideoClick}> 
        <img className='png' src = {videoIcon}></img>  </button>
      <button className='git' onClick = {handleGitHubClick}><img className='png' src={gitHubIcon}></img></button>
    </div>
  );
}

export default IconButtons;