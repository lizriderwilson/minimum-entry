export const registerUser = user => {
  return {
    type: 'REGISTER_USER',
    user
  };
};