module.exports = function index (req, res) {
  res.render('index.hbs', { session: req.session });
};
