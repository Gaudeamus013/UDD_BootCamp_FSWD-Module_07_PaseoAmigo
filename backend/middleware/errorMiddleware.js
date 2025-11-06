export const notFound = (req, res, next) => {
  const error = new Error(`No encontrado - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export const errorHandler = (err, req, res, _next) => {
  const status = err.status || res.statusCode || 500;
  const payload = {
    message: err.message || "Error del servidor",
  };
  if (process.env.NODE_ENV !== "production" && err.details) payload.details = err.details;
  res.status(status).json(payload);
};
