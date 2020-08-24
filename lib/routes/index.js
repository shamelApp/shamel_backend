function index(router) {
  router.get('/', (req, res) => {
    console.log('hello');
    res.end();
  });

  return router;
}

module.exports = index;
