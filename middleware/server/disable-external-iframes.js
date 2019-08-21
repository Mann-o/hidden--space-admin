export default (_req, res, next) => {
  res.setHeader('X-Frame-Options', 'deny')
  next()
}
