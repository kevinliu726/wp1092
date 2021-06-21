const Message = ({ me, author, text }) => {
  return (
    me === author ? 
    <div className='my-message'>
      <p className='message-text'>{text}</p>
      <p className='message-author'>{author}</p>
    </div>:
    <div className='others-message'>
      <p className='message-author'>{author}</p>
      <p className='message-text'>{text}</p>
    </div>
  );
}

export default Message;
