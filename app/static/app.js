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

function setScrappedValue(data) {
    const avatar = document.querySelector('.avatar')
    const name = document.querySelector('#name')
    const username = document.querySelector('#github-username')
    const followers = document.querySelector('#followers')
    const following = document.querySelector('#following')
    const starred = document.querySelector('#starred')
    const repo = document.querySelector('#repo')

    avatar.src = data.avatar_url
    name.textContent = data.name
    username.textContent = data.username
    followers.textContent = data.followers
    following.textContent = data.following
    starred.textContent = data.starred
    repo.textContent = data.num_of_repos
    
    if (data.popular_repos.length >= 3) {
        let count = 1
        for (let repo of data.popular_repos) {
            console.log(repo)
            document.querySelector(`#repo-name-${count}`).textContent = repo.name
            document.querySelector(`#repo-name-${count}`).href = `https://github.com${repo.href}`
            document.querySelector(`#status-${count}`).textContent = repo.repo_status

            if ('language' in repo) {
                document.querySelector(`#repo-lang-${count}`).textContent = repo.language
                document.querySelector(`#lang-color-${count}`).style.backgroundColor = repo.language_color
                document.querySelector(`#lang-color-${count}`).style.visibility = 'visible'
            } else {
                document.querySelector(`#lang-color-${count}`).style.visibility = 'hidden'
                document.querySelector(`#repo-lang-${count}`).textContent = ' '
            }
            
            if ('forked_from' in repo) {
                document.querySelector(`#forked-from-${count}`).innerHTML = `Forked from <a href="https://www.github.com/${repo.forked_from}">${repo.forked_from}</a>`
            } else {
                document.querySelector(`#forked-from-${count}`).innerHTML = ' '
            }    

            if ('description' in repo) {
                document.querySelector(`#description-${count}`).textContent = repo.description
            } else {
                document.querySelector(`#description-${count}`).textContent = ' '
            }

            count += 1
        
            if (count > 3) {
                break
            }
        }
    }

    if (data.popular_repos.length === 2) {
        for (let repo of data.popular_repos) {
            let count = 1
            document.querySelector(`#repo-name-${count}`).textContent = repo.name
            document.querySelector(`#repo-name-${count}`).href = `https://github.com${repo.name}`
            document.querySelector(`#status-${count}`).textContent = repo.repo_status

            if ('language' in repo) {
                document.querySelector(`#repo-lang-${count}`).textContent = repo.language
                document.querySelector(`#lang-color-${count}`).style.backgroungColor = repo.language_color
            }
            
            if ('forked_from' in repo) {
                document.querySelector(`#forked-from-${count}`).innerHTML = `Forked from <a href="https://www.github.com/${repo.forked_from}">${repo.forked_from}</a>`
            }

            if ('description' in repo) {
                document.querySelector(`#description-${count}`).textContent = repo.description
            }
            count++
            if (count > 2) {
                document.querySelector('#three').remove()
                break
            }
        }
    }

    if (data.popular_repos.length === 1) {
        for (let repo of data.popular_repos.reverse) {
            let count = 1
            document.querySelector(`#repo-name-${count}`).textContent = repo.name
            document.querySelector(`#repo-name-${count}`).href = `https://github.com${repo.name}`
            document.querySelector(`#status-${count}`).textContent = repo.repo_status

            if ('language' in repo) {
                document.querySelector(`#repo-lang-${count}`).textContent = repo.language
                document.querySelector(`#lang-color-${count}`).style.backgroungColor = repo.language_color
            }
            
            if ('forked_from' in repo) {
                document.querySelector(`#forked-from-${count}`).innerHTML = `Forked from <a href="https://www.github.com/${repo.forked_from}">${repo.forked_from}</a>`
            }

            if ('description' in repo) {
                document.querySelector(`#description-${count}`).textContent = repo.description
            }
            count++
            if (count > 1) {
                document.querySelector('#two').remove()
                document.querySelector('#three').remove()
                break
            }
        }
    }

    if (data.popular_repos.length = 0) {
        document.querySelector('#two').remove()
        document.querySelector('#two').remove()
        document.querySelector('#three').remove()
    }
}

function displayData(data) {
    if (data === 'An error occured please try again!!') {
        const message = document.getElementById('message')
        message.innerText = data
        alertMsg.style.display = 'inline-block'
        return
    }

    if (data === 'Username not found') {
        const message = document.getElementById('message')
        message.innerText = data
        alertMsg.style.display = 'block'
        return
    }
    
    setScrappedValue(data)
    html.style.height = '17%'
    scrappedDataEle.classList.remove('hide-scrapped-data')

    
}

form.addEventListener('submit', async (e) => {
    e.preventDefault()
    alertMsg.style.display = 'none'

    const username = document.getElementById('username').value
    button.disabled = true
    const scrappedData = await getScrappedData(username)
    displayData(scrappedData)
    button.disabled = false
})

