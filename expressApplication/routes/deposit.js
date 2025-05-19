var express = require('express');
var router = express.Router();
var axios = require('axios');

router.patch('/latitude/:id', async function(req, res) {
  try {
    const { latitude } = req.body;
    const id = req.params.id;
    const ans = await axios.patch('http://localhost:5032/xml/node/' + id + '?path=/deposit/gegraphy/latitude&value=' + latitude);

    res.status(200).send(ans.data);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Błąd przy połączeniu z zewnętrznym API');
  }

})
router.patch('/longitude/:id', async function(req, res) {
  try {
    const { longitude } = req.body;
    const id = req.params.id;
    const ans = await axios.patch('http://localhost:5032/xml/node/' + id + '?path=/deposit/geography/longitude&value=' + longitude);

    res.status(200).send(ans.data);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Błąd przy połączeniu z zewnętrznym API');
  }

})


router.patch('/radius', async function(req, res) {
  try {
    const { radius } = req.body;
    const id = req.params.id;
    const ans = await axios.patch('http://localhost:5032/xml/node/' + id + '?path=/deposit/geography/latitude&value=' + radius);

    res.status(200).send(ans.data);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Błąd przy połączeniu z zewnętrznym API');
  }

})

router.patch('/name', async function(req, res) {
  try {
    const { name } = req.body;
    const id = req.params.id;
    const ans = await axios.patch('http://localhost:5032/xml/attr/' + id + '?path=/deposit&value=' + name + '&attr=name')

    res.status(200).send(ans.data);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Błąd przy połączeniu z zewnętrznym API');
  }

})

module.exports = router;
