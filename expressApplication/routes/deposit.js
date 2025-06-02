var express = require('express');
var router = express.Router();
var axios = require('axios');

// Funkcja pomocnicza do budowania pełnego URL
function buildCSharpUrl(path) {
  const CSharpURL = 'http://localhost:5032/xml';
  return CSharpURL + path;
}

// PATCH pomocnicza
async function patchXmlNode(path, res) {
  try {
    const url = buildCSharpUrl(path);
    const ans = await axios.patch(url);
    res.status(200).send(ans.data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Błąd przy połączeniu z zewnętrznym API');
  }
}

// GET pomocnicza
async function fetchFromBackend(path, res) {
  try {
    const url = buildCSharpUrl(path);
    const ans = await axios.get(url);
    res.status(200).send(ans.data);
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
    res.status(200).send(ans.data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Błąd przy połączeniu z zewnętrznym API');
  }
}

// PATCH endpoints
router.patch('/latitude/:id', async function(req, res) {
  const { latitude } = req.body;
  const id = req.params.id;
  const path = `/node/${id}?path=/deposit/geography/latitude&value=${encodeURIComponent(latitude)}`;
  await patchXmlNode(path, res);
});

router.patch('/longitude/:id', async function(req, res) {
  const { longitude } = req.body;
  const id = req.params.id;
  const path = `/node/${id}?path=/deposit/geography/longitude&value=${encodeURIComponent(longitude)}`;
  await patchXmlNode(path, res);
});

router.patch('/radius/:id', async function(req, res) {
  const { radius } = req.body;
  const id = req.params.id;
  const path = `/node/${id}?path=/deposit/geography/radius&value=${encodeURIComponent(radius)}`;
  await patchXmlNode(path, res);
});

router.patch('/quantity/:id', async function(req, res) {
  const { quantity } = req.body;
  const id = req.params.id;
  const path = `/node/${id}?path=/deposit/geology/estimatedVolume&value=${encodeURIComponent(quantity)}`;
  await patchXmlNode(path, res);
});

router.patch('/name/:id', async function(req, res) {
  const { name } = req.body;
  const id = req.params.id;
  const path = `/attr/${id}?path=/deposit&value=${encodeURIComponent(name)}&attr=name`;
  await patchXmlNode(path, res);
});


///////////////////////////////////////////////////////////////

router.delete('/quantity', async function(req, res) {
  const { nodeName, maxValue } = req.query;
  const path = `/less?nodeName=${encodeURIComponent(nodeName)}&maxValue=${maxValue}`;
  await deleteFromBackend(path, res);
});

// Przykład DELETE endpointu
router.delete('/name', async function(req, res) {
  const { nodeName, attrName, attrValue } = req.query;
  const path = `/attr?nodeName=${encodeURIComponent(nodeName)}&attrName=${encodeURIComponent(attrName)}&attrValue=${encodeURIComponent(attrValue)}`;
  await deleteFromBackend(path, res);
});

router.delete('/region', async function(req, res) {
  const {nodeName, nodeValue} = req.query
  const path = `?nodeName=${nodeName}&nodeValue=${nodeValue}`
  await deleteFromBackend(path, res)
})

router.delete('/')

module.exports = router;
