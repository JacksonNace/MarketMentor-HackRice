import React from 'react'
import LoginButton from '../components/loginButton'

const Welcome = () => {
  return (
    <div>
        <img 
          src="https://www.dropbox.com/scl/fi/8ldionavts9xc6jtsgb4a/marketMentorLogo.jpg?rlkey=shcmiuqeur71mp5k50n1fyly6&st=aal1qrm5&raw=1" 
          alt="Dropbox Image"
          style={{ width: '300px', height: 'auto' }}
        />
        <br/>
        <LoginButton/>
    </div>
  )
}

export default Welcome