import React, { useState } from 'react';
import Registration from './Registration';
import SignIn from './SignIn';


const Login = (props) => {
    const [typeForm,setTypeForm] =useState(false)
const typeFormHandler = () =>{
typeForm ? setTypeForm(false):setTypeForm(true)
}

return(
<>
{!typeForm ? <SignIn onTypeFormHandler={typeFormHandler} {...props}/>:<Registration onTypeFormHandler={typeFormHandler} {...props}/>}

</>
    
)


}

export default Login
