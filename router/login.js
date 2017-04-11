module.exports = function login (req, res) {
  res.render('login.hbs', { session: req.session });
};
