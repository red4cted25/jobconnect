import { useState } from 'react'

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function handleSubmit(event) {
        event.preventDefault()
        onLogin({ email, password })
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email: </label>
                <input type="email" id="email" name='email' value={email} onChange={e => setEmail(e.target.value)} required />
                <label htmlFor="password">Password: </label>
                <input type="password" id="password" name='password' value={email} onChange={e => setPassword(e.target.value)} required />
                <br />
                <input type="submit" value="Submit" />
            </form>
        </>
    )
}

export default Login