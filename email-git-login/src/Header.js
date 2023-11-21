import './header.css'
const Header = () => {
    // will be used for the header
    // I'll ask my linkedin link, website link, and github link


    return (
        <>
          <div className='header-container'>
            <div className='header-contents'>
                <span className='header-title'>
                    CLEARVICTION challenge
                </span>
                
            </div>
            <div className = 'header-nav'>
                <div className='nav-contents'> 
                    <a href='#' className='nav-links'>
                        Attemped
                    </a>
                    <a href='#' className='nav-links'>
                        by 
                    </a>
                    <a href='https://vincentpham123.github.io/' target='_blank' className='nav-links'>
                        Vincent 
                    </a>
                    <a href='https://vincentpham123.github.io/' target='_blank' className='nav-links'>
                        Pham
                    </a>
                </div>

            </div>
          </div>  
        </>
    )



}

export default Header