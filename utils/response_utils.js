const success = (data) => {
  return {
    status: "success",
    data,
  };
};

const fail = (data, message = "Fail") => {
  return {
    status: "fail",
    message,
    data,
  };
};

const error = (message = "Error") => {
  return {
    status: "error",
    message,
  };
};

module.exports = {
  success,
  fail,
  error,
};
