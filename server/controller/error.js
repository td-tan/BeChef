

function errorhandler(err, req, res) {
    console.log(err)
    res.status(500).send({
      error: 'Something went wrong'
    });
  }

module.exports = {
    errorhandler
};
