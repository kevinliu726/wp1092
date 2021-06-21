
const generateChatBoxName = (userName, friend) => {
  return [userName, friend].sort().join('_');
};

export default generateChatBoxName;