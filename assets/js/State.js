export const getUsername = () => {
    return sessionStorage.getItem("username") || "";
}

export const setUsername = (username) => {
    sessionStorage.setItem("username", username);
}

export const getSelectedLevel = () => {
    return sessionStorage.getItem("level") || "medium";
}

export const setSelectedLevel = (level) => {
    sessionStorage.setItem("level", level);
}

export const getScore = () => {
    return Number(sessionStorage.getItem("score")) || 0;
}

export const setScore = (score) => {
    sessionStorage.setItem("score", score);
}

export const getTime = () => {
    return sessionStorage.getItem("time") || 0;
}

export const setTime = (time) => {
    sessionStorage.setItem("time", time);
}