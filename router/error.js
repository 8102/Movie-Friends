module.exports = function error (req, res) {
  console.log("Fail to connect to: " + req.originalUrl);
  res.status(404).render('error.hbs', {
    pageName: req.originalUrl,
    session: req.session
  });
};
