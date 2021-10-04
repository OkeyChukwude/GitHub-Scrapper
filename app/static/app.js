const path = window.location.href

async function getScrappedData(username) {
    const response = await fetch(`/scrapper/${username}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const data = response.json()
    return data
}

