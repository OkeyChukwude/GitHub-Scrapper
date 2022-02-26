import React from 'react'

function Result(props) {
    return (
        <>
            <div className="container-fluid " >
                <div className="row align-items-center rounded-3 border shadow-lg">
                    <div>
                        <a href='/' ><i className="bi bi-arrow-left-circle" style={{fontSize: "2rem", color: "black"}}></i></a>
                    </div>
                    <div className=" col-lg-6 pb-4 px-5">
                        <img src={props.scrappedData.avatar_url} className="d-block mx-lg-auto img-fluid avatar rounded-circle" alt="Avartar" width="700" height="500" loading="lazy" />
                        <h3 className="mb-0 text-center" id="name">{props.scrappedData.name}</h3>
                        <span className="d-block strong mb-2 text-center" id="github-username">{props.scrappedData.username}</span>
                        <p className="text-center d-block"><i className="bi bi-people"> </i><strong id="followers">{props.scrappedData.followers || 0}</strong> followers<i className="bi bi-dot"></i><strong id="following">{props.scrappedData.following || 0}</strong> following<i className="bi bi-dot"></i><i className="bi bi-star"></i> <strong id="starred">{props.scrappedData.starred || 0}</strong><i className="bi bi-dot"></i><span className="iconify" data-icon="codicon:repo"></span> <strong id="num-of-repo">{props.scrappedData.num_of_repos || 0}</strong></p>
                    </div>
                    <div className="col-lg-6 mb-5">
                        <h1 className="display-8 fw-bold lh-1 text-center">Popular Repositries</h1>
                        {
                            typeof props.scrappedData.popular_repos === 'string'
                            ?
                                <p className="no-repo text-center">{props.scrappedData.popular_repos}</p>
                            :
                                <div className="list-group">
                                    {props.scrappedData.popular_repos.map(repo => (
                                        <div key={repo.name} className="list-group-item  d-flex gap-3 py-3" aria-current="true">
                                            <div className="d-flex gap-2 w-100 justify-content-between ">
                                                <div>
                                                    <h6 className="mb-0"><a href={`https://github.com${repo.href}`}>{repo.name}</a></h6>
                                                    
                                                    {
                                                        'forked_from' in repo
                                                        ?
                                                            <p className="mb-2 small">Forked from <a href={`https://www.github.com/${repo.forked_from}`}>{`${repo.forked_from}`}</a></p>
                                                        :
                                                            <p className="mb-2 small"> </p>
                                                    }
                                                    {
                                                        'description' in repo 
                                                        ?
                                                            <p className="mb-0 opacity-75 small">{repo.description}</p>
                                                        :
                                                            <p className="mb-0 opacity-75 small"> </p>
                                                    }

                                                    {
                                                        'language' in repo 
                                                        ?
                                                            <p className="mb-0 small"><span className="lang-color" style={{backgroundColor: `${repo.language_color}`}}></span> <span id='repo-lang-1'>{repo.language}</span></p>
                                                        :
                                                            <p className="mb-0 small"><span id="lang-color"></span> <span id='repo-lang-1'></span></p>
                                                    }

                                                    
                                                </div>
                                                <small className="opacity-50 text-nowrap">{repo.repo_status}</small>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                        }
                        
                        
                    </div>
                </div>
            </div>
        </>
    )
}

export default Result