
module.exports = function rate (req, res) {
  res.render('rate.hbs', { session: req.session });
};
