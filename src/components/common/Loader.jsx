
  import React from 'react'
  import "./Loader.css"
  function Loader() {
    return (
        <div className="loader-container">
        <div className="loader-spinner"></div> 
        <p className="loader-text">
          Hang tight! We're fetching your data... <br />
          Sometimes things can be a bit slower on Vercel's free plan, but we promise it'll be worth the wait!
        </p>
      </div>
    )
  }
  
  export default Loader