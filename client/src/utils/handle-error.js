const handleError = (error) => {
  return error.response?.data.msg || "Uh oh... Something went wrong";
};

export default handleError;
