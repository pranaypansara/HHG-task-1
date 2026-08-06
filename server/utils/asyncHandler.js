/** Wraps an async controller/middleware so thrown errors reach the error handler. */
export default function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}