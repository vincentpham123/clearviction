
import EmailGitCheck from "./EmailCheck";
import GitCheck from "./GitCheck";
import {useState, useEffect} from "react"
import './emailgitform.css'
const EmailGitForm = () => {
    const [emailValue, setEmailValue] = useState('');
    const [repoValue, setRepoValue] = useState('');

    const [validEmail, setValidEmail] = useState(false);
    const [success,setSuccess] = useState('')
    const [error, setErrors] = useState('')
    //handle submit 
    // create formData and submit to fetch as a post 

    const handleSubmit = async (event) => {
        event.preventDefault();

    
        try{
            let response =  await fetch('https://cv-devs-temp-challenge.vercel.app/api/challenge',
                {
                    method: 'POST',
                    body: JSON.stringify({
                        email:emailValue,
                        githubRepoUrl: repoValue
                    }),
                    headers: {'Content-Type': 'application/json'}
                }
            )

            if (response.ok){
                const data = await response.json()
                console.log(data);
                setSuccess(data)
            } else{
                const errorResponse = await response.json()
                console.log(errorResponse)
                setErrors(errorResponse.error)
            }
        } catch (error){
            setErrors('An error occured with the requeset')
        }
        
        // set emailValue and repoValue 
        // only allow submission 
    }
    return (
        <>
            <form className='form-container' onSubmit={event=>handleSubmit(event)}>
                <EmailGitCheck setEmailValue={setEmailValue} emailValue={emailValue} />
                <GitCheck repoValue={repoValue} setRepoValue = {setRepoValue} />
                <button>
                    Submit
                </button>
            </form> 
        </>
        
    )
}

export default EmailGitForm