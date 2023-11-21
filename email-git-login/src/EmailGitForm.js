
import EmailGitCheck from "./EmailCheck";
import GitCheck from "./GitCheck";
import {useState, useEffect} from "react"
import './emailgitform.css';
import { Modal } from "./context/Modal";
const EmailGitForm = () => {
    const [emailValue, setEmailValue] = useState('');
    const [repoValue, setRepoValue] = useState('');

    const [validEmail, setValidEmail] = useState(false);
    const [success,setSuccess] = useState('')
    const [error, setErrors] = useState('')
    // modal useState
    const [showModal, setShowModal] = useState(false);

    //handle submit 
    // create formData and submit to fetch as a post 
    const handleModalClose = () => {
        setEmailValue('')
        setRepoValue('')
        setShowModal(false);
    }
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
            );

            if (response.ok){
                const data = await response.json();
           
                setSuccess(data.message);
                setShowModal(true);
            } else{
                const errorResponse = await response.json()
                console.log(errorResponse)
                setErrors(errorResponse.error);
                setShowModal(true);

            }
        } catch (error){
            setErrors('An error occured with the requeset')
            setShowModal(true);

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

            {showModal && (
                <Modal onClose={()=>handleModalClose()}>
                    {/* this will display the message and have a button asking if they would like to submit another */}
                    <div className='message-modal'>
                        <div className='message'>
                            {success.length >0 && (<strong className='success-message'>
                                {success}
                            </strong>)
                            }
                            {error.length >0 && (<strong className='error-message'>
                                {error}
                            </strong>)
                            }
                        </div>
                        <button 
                            className="modal-button" 
                            onClick={()=> handleModalClose()}
                        >
                            Submit Another??
                        </button>
                    </div>
                </Modal>
            )}
        </>
        
    )
}

export default EmailGitForm