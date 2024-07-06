// constant to avoid debugging typos
const GET_ALL_TWEETS = 'tweet/getAllTweets';
const POST_NEW_TWEET = 'tweet/createTweet';

//regular action creator
const loadTweets = (tweets) => {
  return {
    type: GET_ALL_TWEETS,
    tweets
  };
};

// thunk action creator
export const getAllTweets = () => async (dispatch) => {
  const response = await fetch('/api/tweets');

  if (response.ok) {
    const data = await response.json();
    dispatch(loadTweets(data));
    return data;
  }
};

// state object
const initialState = {};

// reducer
const tweetsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_TWEETS: {
      const newState = {};
      action.tweets.forEach((tweet) => (newState[tweet.id] = tweet));
      return newState;
    }
    case POST_NEW_TWEET: {
      const newState = {...state};
      newState[action.newTweet.id] = action.newTweet;
      return newState;
    }
    default:
      return state;
  }
};

// post action creator
const postTweet = (newTweet) => {
  return {
    type: POST_NEW_TWEET,
    newTweet
  };
};

// thunk action creator
export const postNewTweet = (payload) => async (dispatch) => {
  const response = await fetch('/api/tweets', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(postTweet(data));
    return data;
  }
};


export default tweetsReducer;
