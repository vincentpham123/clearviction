
import EmailGitForm from "./EmailGitForm";
import Header from "./Header";
import './app.css' 
function App() {
  return (
    // this will contain everything that will make my temp website look like clear victions
    // for now I will work on the logic of the email and github check
    <>
    <div className='body'>
      <Header />
      <EmailGitForm />
    </div>
    </>
  );
}

export default App;
