async function getAllBackendData()
{
    const res = await fetch('/api/all')
    const data = await res.json();

    let xmlMap = data.data

    Object.keys(xmlMap).map((key : string) => {
      xmlMap[key] = xmlMap[key][0]
    })

    return xmlMap
}

export {getAllBackendData}