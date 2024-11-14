const isAuthenticated = () => {
  const token = localStorage.getItem('authToken');
  return !!token;
};

export default isAuthenticated;
