
import EmailGitCheck from "./EmailCheck";
import GitCheck from "./GitCheck";
import {useState, useEffect} from "react"
const EmailGitForm = () => {
    const [emailValue, setEmailValue] = useState('');
    const [repoValue, setRepoValue] = useState('');

    const [validEmail, setValidEmail] = useState(false);
    

    //handle submit 
    // create formData and submit to fetch as a post 

    const handleSubmit = (event) =>{
        event.preventDefault();

        const formData = new FormData();
        formData.append('email',emailValue);
        formData.append('githubRepoUrl', repoValue);


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