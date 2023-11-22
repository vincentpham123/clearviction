
import EmailGitCheck from "./EmailCheck";
import GitCheck from "./GitCheck";
import {useState, useEffect} from "react"
import './emailgitform.css';
import { Modal } from "./context/Modal";
const EmailGitForm = () => {
    const [emailValue, setEmailValue] = useState('');
    const [repoValue, setRepoValue] = useState('');

    const [validEmail, setValidEmail] = useState(false);
    const [validRepo, setValidRepo] = useState(false);
    const [message,setMessage] = useState('')
    // modal useState
    const [showModal, setShowModal] = useState(false);

    //handle submit 
    // create formData and submit to fetch as a post 
    const handleModalClose = () => {
        setMessage('')
        setEmailValue('');
        setRepoValue('');
        setShowModal(false);
    }

    // function to disable or enable submit button 

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const [username, repoName] = repoValue.split('/').slice(-2);
        
        //https://api.github.com/repos/<user>/<repo>
        try{
            let gitCheck = await fetch(`https://api.github.com/repos/${username}/${repoName}`)
            if (!gitCheck.ok){
                setMessage('Git Repo does not exist')
                setShowModal(true);
                return
            }
        // if repo does not exist, modal will pop up with message
        } catch{
            setMessage('An error occured with the request')
            setShowModal(true);
            return
        }
        
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
            );

            if (response.ok){
                const data = await response.json();
           
                setMessage(data.message);
                setShowModal(true);
            } else{
                const errorResponse = await response.json()

                setMessage(errorResponse.error);
                setShowModal(true);

            }
        } catch (error){
            setMessage('An error occured with the request')
            setShowModal(true);

        }
        
        // set emailValue and repoValue 
        // only allow submission once those are both true??
        
    }
    return (
        <>
            <form className='form-container' onSubmit={event=>handleSubmit(event)}>
                <h1 className='instructions'> Enter Email and Git Repo URL </h1>
                <EmailGitCheck 
                    setEmailValue={setEmailValue} 
                    emailValue={emailValue} 
                    validEmail = {validEmail}
                    setValidEmail= {setValidEmail}
                    />
                <GitCheck 
                    repoValue={repoValue} 
                    setRepoValue = {setRepoValue} 
                    validRepo={validRepo}
                    setValidRepo={setValidRepo}
                    />
                <button 
                    className='form-button'
                    disabled = {!validEmail || !validRepo}
                    // if either are false then button will be disabled
                    >
                    Submit
                </button>
            </form> 

            {showModal && (
                <Modal onClose={()=>handleModalClose()}>
                    {/* this will display the message and have a button asking if they would like to submit another */}
                    <div className='message-modal'>
                        <h2 className='modal-title'>Submissions</h2>
                        <div className="submissions">
                            <span className="submission">
                                Email: 
                                <strong className='submitted-value'>{emailValue}</strong>
                            </span>
                            <span className="submission">
                                Git Url: 
                                <strong className='submitted-value' >{repoValue}</strong>
                            </span>

                        </div>
                        <div className='message'>
                            {message.length >0 && (<strong className='Modal-message'>
                                {message}
                            </strong>)
                            }
                        </div>
                        <button 
                            className="modal-button" 
                            onClick={()=> handleModalClose()}
                        >
                            Submit Another?
                        </button>
                    </div>
                </Modal>
            )}
        </>
        
    )
}

export default EmailGitForm