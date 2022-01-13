import React, { useState } from 'react'
import axios from 'axios'
import './Home.css'

function Home() {
    const [username, setUsername] = useState('')
    const [disable, setDisable] = useState(false)
    const [data, setData] = useState('')

    async function scrape (username) {
        try {
            const response = await axios.get(`/scrapper/${username}`)
            return response
        } 
        catch (error) {
            console.log(error)
        }
    }

    async function handleSubmit (event)  {
        event.preventDefault()
        setDisable(true)
        const { data } = await scrape(username)
        console.log(data)
        setDisable(false)
    }

    return (
        <>
            <div className='center'>
                <span id="message" className="alert alert-danger" role="alert" style={{visibility: "hidden", display: "inline-block"}}></span>
                <form action="" onSubmit={handleSubmit}>
                    <h1 className="h3 mb-4 fw-normal" > <i className="bi-github" role="img" aria-label="GitHub"></i> GitHub Scrapper</h1>
                    <div className="row row-cols d-flex align-items-center">
                        <div className="input-group mb-3 has-validation">
                            <span className="input-group-text" id="addon-wrapping">@</span>
                            <input type="text" className="form-control" id="username" placeholder="GitHub username" required value={username} onChange={e => setUsername(e.target.value)}/>
                            <button id="btn" className="btn btn-primary" type="submit" disabled={disable}><i className="bi bi-search"></i></button>
                        </div>              
                    </div>
                </form>
            </div>
        </>
    )
}

export default Home