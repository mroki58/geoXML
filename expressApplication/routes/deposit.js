var express = require('express');
var router = express.Router();
var axios = require('axios');

// Funkcja pomocnicza do budowania pełnego URL
function buildCSharpUrl(path) {
  const CSharpURL = 'http://localhost:5032/deposit';
  return CSharpURL + path;
}

// PATCH pomocnicza
async function patchXmlNode(path, res, data) {
  try {
    const url = buildCSharpUrl(path);
    const ans = await axios.patch(url, { Value: data });
    res.status(200).send(String(ans.data));
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Błąd przy połączeniu z zewnętrznym API');
  }
}

// pomocnicza DELETE
async function deleteFromBackend(path, res) {
  try {
    const url = buildCSharpUrl(path);
    const ans = await axios.delete(url);
    res.status(200).send(String(ans.data));
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Błąd przy połączeniu z zewnętrznym API');
  }
}

// PATCH endpoints
router.patch('/latitude/:id', async function(req, res) {
  const { latitude } = req.body;
  const id = req.params.id;
  const path = `/latitude/${id}`;
  await patchXmlNode(path, res, latitude);
});

router.patch('/longitude/:id', async function(req, res) {
  const { longitude } = req.body;
  const id = req.params.id;
  const path = `/longitude/${id}`;
  await patchXmlNode(path, res, longitude);
});

router.patch('/radius/:id', async function(req, res) {
  const { radius } = req.body;
  const id = req.params.id;
  const path = `/radius/${id}`;
  await patchXmlNode(path, res, radius);
});

router.patch('/quantity/:id', async function(req, res) {
  const { quantity } = req.body;
  const id = req.params.id;
  const path = `/quantity/${id}`;
  await patchXmlNode(path, res, quantity);
});

router.patch('/name/:id', async function(req, res) {
  const { name } = req.body;
  const id = req.params.id;
  const path = `/name/${id}`;
  await patchXmlNode(path, res, name);
});


///////////////////////////////////////////////////////////////

router.delete('/quantity', async function(req, res) {
  const { maxValue } = req.query;
  const path = `/quantity?maxValue=${maxValue}`;
  await deleteFromBackend(path, res);
});

// Przykład DELETE endpointu
router.delete('/name', async function(req, res) {
  const { name } = req.query;
  const path = `/name?name=${encodeURIComponent(name)}`;
  await deleteFromBackend(path, res);
});

router.delete('/location', async function(req, res) {
  const { location } = req.query;
  const path = `/location?location=${encodeURIComponent(location)}`;
  await deleteFromBackend(path, res);
})

router.delete('/')

module.exports = router;
