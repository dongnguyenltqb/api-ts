export function Authentication(req, res, next) {
  console.log(`${new Date().toTimeString()} ${req.method} ${req.url}`);
  req.user = {
    user_id: 1,
  };
  next();
}
