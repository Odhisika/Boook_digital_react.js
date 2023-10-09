export const setAllStory = (data) => {
    return {
      type: "SET_ALL_STORY_BOOKS",
      payload: data,
    };
  };
  
  export const getAllStory = () => {
    return {
      type: "GET_ALL_STORY_BOOKS",
    };
  };
  export const clearAllStory = () => {
    return {
      type: "CLEAR_ALL_STORY_BOOKS",
    };
  };
 