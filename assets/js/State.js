// ALL FUNCTIONS IN THIS FILE TO READ AND WRITE TO SESSION STORAGE
export const getUsername = () => {
  return sessionStorage.getItem("username") || "";
};

export const setUsername = (username) => {
  sessionStorage.setItem("username", username);
};

export const getSelectedLevel = () => {
  // if level is not set in session storage, returns "medium"
  return sessionStorage.getItem("level") || "medium";
};

export const setSelectedLevel = (level) => {
  sessionStorage.setItem("level", level);
};

export const getScore = () => {
  // if score is not set in session storage, returns 0
  // convert score to number from string, because session storage stores values as string
  return Number(sessionStorage.getItem("score")) || 0;
};

export const setScore = (score) => {
  sessionStorage.setItem("score", score);
};

export const getTime = () => {
  return sessionStorage.getItem("time") || 0;
};

export const setTime = (time) => {
  sessionStorage.setItem("time", time);
};

// get is sound on or off from session storage
export const getIsSoundOn = () => {
  let isSoundOn = sessionStorage.getItem("isSoundOn");
  // is sound on or off is stored as a string in session storage
  if (isSoundOn) {
    // convert string to boolean
    return JSON.parse(isSoundOn);
  } else {
    // if isSoundOn is not set in session storage, set it to true
    return true;
  }
};

// set is sound on or off in session storage
export const setIsSoundOn = (isSoundOn) => {
  // convert boolean to string
  sessionStorage.setItem("isSoundOn", JSON.stringify(isSoundOn));
};

export const getWrongCount = () => {
  // if wrongCount is not set in session storage, returns 0
  // if exist in session storage, returns wrongCount as a number
  return Number(sessionStorage.getItem("wrongCount")) || 0;
};

export const setWrongCount = (wrongCount) => {
  sessionStorage.setItem("wrongCount", wrongCount);
};
