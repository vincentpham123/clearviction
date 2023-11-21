import {useState, useEffect} from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX, faCheck } from '@fortawesome/free-solid-svg-icons'
import { faGithub} from '@fortawesome/free-brands-svg-icons'
import './gitcheck.css'
const GitCheck =  ({repoValue, setRepoValue}) => {
    const [validRepo, setValidRepo] = useState(false);

    useEffect (()=>{
        if (validateGitRepo(repoValue)){
            setValidRepo(true)
        } else{
            setValidRepo(false)
        }
    },[repoValue])
    const validateGitRepo = (repoUrl) => {
        const gitRepoRegex = /^https:\/\/github\.com\/[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\/[a-zA-Z0-9_.-]+$/;
        return gitRepoRegex.test(repoUrl);

    }
    return (
        <>
        <div className='git-container'>
            <input
                className='email-git-text'
                type='text'
                placeholder = 'Git Repo URL'
                value = {repoValue}
                onChange = { event=>
                    setRepoValue(event.target.value)
                }
            />
            <div className='git-check-container'>
                <div className='git-check-frame'>
                    <span className='git-check-text'>
                        {/* <FontAwesomeIcon className='git-icon' icon={faGithub} /> */}
                        <FontAwesomeIcon icon={faGithub} />
                        <span className='valid-git-text'>
                            Valid Git Url (ex. https://github.com/username/repo-name)
                        </span>

                    </span>
                    {!validRepo && <FontAwesomeIcon className='x-icon' icon={faX}  /> }
                    {validRepo && <FontAwesomeIcon className='check-icon' icon={faCheck} />}

                </div>

            </div>

        </div>
        </>
    )
}

export default GitCheck