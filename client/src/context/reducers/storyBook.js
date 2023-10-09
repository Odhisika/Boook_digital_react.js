const storyReducer = (state = null, action) => {
  switch (action.type) {
    case "GET_ALL_STORY_BOOKS":
      return state;

    case "SET_ALL_STORY_BOOKS":
      return action.payload || null;

      case "CLEAR_ALL_STORY_BOOKS":
      return null;

    default:
      return state;
  }
};

export default storyReducer;
