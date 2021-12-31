import React, { useState} from 'react'

const LoginForm = ({NewLogin}) => {
    const [username, setUsername] = useState('') 
    const [password, setPassword] = useState('')

    const handleLogin = async (event) => {
        event.preventDefault()
        NewLogin({username, password})
        setUsername('')
        setPassword('')
    }

    return (
        <div>
            <h2>Login</h2>  
            <form onSubmit={handleLogin}>
                <div>
                username
                    <input
                        type='username'
                        value={username}
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                password
                    <input
                        type='password'
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type='submit'>login</button>
            </form>
        </div>
    )
}

export default LoginForm