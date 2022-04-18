const Notification = ({ message }) => {

  if (message === null) {
    return null
  } else if (message.includes('Added')) {
    return (
      <div className='addition'>
        {message}
      </div>
    )  
  } else if (message.includes('Removed')) {
    return (
      <div className='remove'>
        {message}
      </div>
    )  
  } else if (message.includes('Information')) {
    return (
      <div className='removed'>
        {message}
      </div>
    )  
  } else if (message.includes('validation')) {
    <div className='removed'>
      {message}
    </div>
  } 


  
    return (
      <div className='update'>
        {message}
      </div>
    )
  }

  export default Notification