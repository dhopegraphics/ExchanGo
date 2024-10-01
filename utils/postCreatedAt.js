// utils/timeUtils.js

export const calculateTimeElapsed = (createdAt) => {
  const now = new Date();
  const postDate = new Date(createdAt);
  const diffInSeconds = Math.floor((postDate - now) / 1000);

  if (diffInSeconds < 0) {
    // Past date
    return calculatePastTime(Math.abs(diffInSeconds));
  } else {
    // Future date
    return calculateFutureTime(diffInSeconds);
  }
};

const calculatePastTime = (diffInSeconds) => {
  if (diffInSeconds < 60)
    return `${diffInSeconds} sec${diffInSeconds !== 1 ? "s" : ""} ago`;
  if (diffInSeconds < 3600)
    return `${Math.floor(diffInSeconds / 60)} min${Math.floor(diffInSeconds / 60) !== 1 ? "s" : ""} ago`;
  if (diffInSeconds < 86400)
    return `${Math.floor(diffInSeconds / 3600)} hour${Math.floor(diffInSeconds / 3600) !== 1 ? "s" : ""} ago`;
  if (diffInSeconds < 2592000)
    return `${Math.floor(diffInSeconds / 86400)} day${Math.floor(diffInSeconds / 86400) !== 1 ? "s" : ""} ago`;
  if (diffInSeconds < 31536000)
    return `${Math.floor(diffInSeconds / 2592000)} month${Math.floor(diffInSeconds / 2592000) !== 1 ? "s" : ""} ago`;
  return `${Math.floor(diffInSeconds / 31536000)} year${Math.floor(diffInSeconds / 31536000) !== 1 ? "s" : ""} ago`;
};

const calculateFutureTime = (diffInSeconds) => {
  if (diffInSeconds < 60)
    return `in ${diffInSeconds} sec${diffInSeconds !== 1 ? "s" : ""}`;
  if (diffInSeconds < 3600)
    return `in ${Math.floor(diffInSeconds / 60)} min${Math.floor(diffInSeconds / 60) !== 1 ? "s" : ""}`;
  if (diffInSeconds < 86400)
    return `in ${Math.floor(diffInSeconds / 3600)} hour${Math.floor(diffInSeconds / 3600) !== 1 ? "s" : ""}`;
  if (diffInSeconds < 2592000)
    return `in ${Math.floor(diffInSeconds / 86400)} day${Math.floor(diffInSeconds / 86400) !== 1 ? "s" : ""}`;
  if (diffInSeconds < 31536000)
    return `in ${Math.floor(diffInSeconds / 2592000)} month${Math.floor(diffInSeconds / 2592000) !== 1 ? "s" : ""}`;
  return `in ${Math.floor(diffInSeconds / 31536000)} year${Math.floor(diffInSeconds / 31536000) !== 1 ? "s" : ""}`;
};
