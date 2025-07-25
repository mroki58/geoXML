var express = require('express');
var router = express.Router();
var axios = require('axios');
var bodyParser = require('body-parser');

router.post('/xml/create', async function(req, res) {
  try {
    const {
      name,
      type,
      estimatedVolume,
      depth,
      status,
      location,
      region,
      latitude,
      longitude,
      radius
    } = req.body;

    const ans = await axios.post('http://localhost:5032/xml/create', {
      name,
      type,
      estimatedVolume,
      depth,
      status,
      location,
      region,
      latitude,
      longitude,
      radius
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    res.status(200).send(ans.data);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Błąd przy połączeniu z zewnętrznym API');
  }
})


router.post('/xml', express.text({type: 'application/xml'}), async function(req, res) { 
  try {
    console.log(req.body)
    const ans = await axios.post('http://localhost:5032/xml', {Xml: req.body});

    if(ans.status === 200 && ans.data === 1) {
      res.status(200).send({msg: 'Zasób został dodany pomyślnie'});
    }else {
      res.status(400).send({msg: ans.data});
    }

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Błąd przy połączeniu z zewnętrznym API');
  }
});

router.get('/all', async function(req, res) {
  try {
    const ans = await axios.get('http://localhost:5032/all');

    res.status(200).send(ans.data);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Błąd przy połączeniu z zewnętrznym API');
  }
});

module.exports = router;
