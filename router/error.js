module.exports = function error (req, res) {
  res.status(404).render('error.hbs', {
    pageName: req.originalUrl,
    session: req.session
  });
};
