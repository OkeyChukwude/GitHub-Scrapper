import React, { useState } from 'react'
import axios from 'axios'
import './Home.css'
import Result from './result'

function Home() {
    const [username, setUsername] = useState('')
    const [disable, setDisable] = useState(false)
    const [scrappedData, setScrappedData] = useState()
    const [error, setError] = useState('')

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
    
        if (data === 'An error occured please try again!!' || data === 'Username not found' || data === 'An error occured.\nCheck you network and try again!!') {
            setError(data)
        } else {
            setScrappedData(data)
        }
        setDisable(false)
    }

    return (
        <>   
            {   scrappedData
                ?
                    <div>
                        <Result scrappedData={scrappedData}/>
                    </div>
                    
                :
                    <div className='center'>
                        {
                            error &&
                                <span id="message" className="alert alert-danger" role="alert" style={{display: "inline-block"}}>{error}</span>
                        }

                        <form action="" onSubmit={handleSubmit}>
                            <h1 className="h3 mb-4 fw-normal text-center" > <i className="bi-github" role="img" aria-label="GitHub"></i> GitHub Scrapper</h1>
                            <div className="row row-cols d-flex align-items-center">
                                <div className="input-group mb-3 has-validation">
                                    <span className="input-group-text" id="addon-wrapping">@</span>
                                    <input type="text" className="form-control" id="username" placeholder="GitHub username" required value={username} onChange={e => setUsername(e.target.value)}/>
                                    {
                                        disable
                                        ?
                                            <button class="btn btn-primary" type="button" disabled>
                                                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                            </button>
                                        :
                                            <button id="btn" className="btn btn-primary" type="submit"><i className="bi bi-search"></i></button>
                                    }
                                </div>              
                            </div>
                        </form>
                    </div>
            } 
        </>
    )
}

export default Home