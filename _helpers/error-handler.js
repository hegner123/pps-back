const errorHandler = (err, req, res, next) => {
  if (typeof err === "string") {
    // custom application error
    console.log({ message: `${err}` });
    return res.status(400).json({ message: `${err}` });
  }

  if (err.name === "ValidationError") {
    // mongoose validation error
    console.log({ message: err.message });
    return res.status(400).json({ message: err.message });
  }

  if (err.name === "UnauthorizedError") {
    // jwt authentication error
    console.log({ message: "Invalid Token" });
    return res.status(401).json({ message: "Invalid Token" });
  }

  // default to 500 server error
  return res.status(500).json({ message: err.message });
};

export { errorHandler };
