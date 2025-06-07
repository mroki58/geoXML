async function getAllBackendData()
{
    const res = await fetch('/api/all')
    const data = await res.json();

    console.log("Fetched data:", data)
    return data
}

export {getAllBackendData}