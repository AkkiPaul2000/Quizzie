import React from 'react';

const NotFoundPage = () => {
  return (
    <div style={{display:'flex',flex:1,justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
      <div style={{textAlign:'center'}}>
        <h1 style={{fontSize:200}}>404 </h1>
      <h4>Page Not Found</h4>
      <p>The page you are looking for does not exist.</p>
      </div></div>
  );
};

export default NotFoundPage;