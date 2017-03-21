module.exports = function login (req, res) {
  res.status(404).render('error.hbs', {pageName: req.originalUrl});
};
