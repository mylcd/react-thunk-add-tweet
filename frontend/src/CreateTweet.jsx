import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postNewTweet } from './store/tweet';

const CreateTweet = () => {
  const dispatch = useDispatch();

  const [message, setMessage] = useState('');
  const handleMessage = e => setMessage(e.target.value);

  /*useEffect(() => {
    dispatch(getAllTweets());
  }, [dispatch]);*/

  const handleSubmit = e => {
    e.preventDefault();
    const newTweet = {
      message
    }

    dispatch(postNewTweet(newTweet));
    //reset();
  }

  return (
    <form
      onSubmit={handleSubmit}
    >
      <h2>Create a Tweet</h2>
      <label>
        Message
        <input
          value={message}
          onChange={handleMessage}
          type="text"
          name="Tweet"
        />
      </label>
      <button
        type="submit"
      >
        Create Tweet
      </button>
    </form>
  );
};

export default CreateTweet;
