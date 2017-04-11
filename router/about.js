module.exports = function about (req, res) {
  res.render('about.hbs', { session: req.session });
};
