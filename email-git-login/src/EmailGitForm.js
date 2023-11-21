
import EmailGitCheck from "./EmailCheck";
import GitCheck from "./GitCheck";
import {useState, useEffect} from "react"
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

        const formData = new FormData();
        formData.append('email',emailValue);
        formData.append('githubRepoUrl', repoValue);

        try{
            let response =  await fetch('https://cv-devs-temp-challenge.vercel.app/api/challenge',
                {
                    method: 'POST',
                    body: formData
                }
            )

            if (response.ok){
                const data = await response.json()
                setSuccess(data)
            } else{
                const errorResponse = await response.json()
                setErrors(error.error)
            }
        } catch (error){
            setErrors('An error occured with the requeset')
        }
        
        // set emailValue and repoValue 
        // only allow submission 
    }
    return (
        <>
            <form className='form-container' onSub>
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