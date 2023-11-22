
import {useState, useEffect} from "react"
import './emailcheck.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faX, faCheck } from '@fortawesome/free-solid-svg-icons'
const EmailGitCheck = ({setEmailValue, emailValue, validEmail, setValidEmail}) => {

    // TO DO:
    // fix spacing in the email text 
    // style the email text box 
    
    // const [validEmail, setValidEmail] = useState(false);

    useEffect (()=>{
        if (validateEmail(emailValue)){
            setValidEmail(true)
        } else{
            setValidEmail(false)
        }

    },[emailValue])
    const validateEmail = (email) => {
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        return emailRegex.test(email);
    }
    return (
        <>
        <div className='email-container'>
            <input 
                className = 'email-git-text' 
                type='text' 
                placeholder = 'Email'
                value = {emailValue}
                onChange = { event=>
                    setEmailValue(event.target.value)
                }
            />
            <div className='email-check-container'>
                <div className='email-check-frame'>
                    <span className= 'email-check-text'>
                        <FontAwesomeIcon className='email-icon'icon={faEnvelope} />
                        <span className='valid-email-text'>
                            Valid Email (ex. example@email.com)
                        </span>

                        {!validEmail && <FontAwesomeIcon className='x-icon' icon={faX}  /> }
                        {validEmail && <FontAwesomeIcon className='check-icon' icon={faCheck} />}
                    </span>

                </div>

            </div>
        </div>
        </>
        
    )
}

export default EmailGitCheck