import { useState } from "react"

const EmailForm = (props) => {
    const [emailFrom, setEmailFrom] = useState('')
    const [emailTo, setEmailTo] = useState('')
    const [error, setError] = useState(null)
    
    
    const emailFromHandler = event => {
        setEmailFrom(event.target.value)
    }

    const emailToHandler = event => {
        setEmailTo(event.target.value)
    }
    
    const sendEmailHandler = (event) => {
        event.preventDefault()
        
        if(emailFrom.trim() === '' || emailTo.trim() === '') {
            setError("You inputs are incorrect, please check and try again.")
            return
        }

        props.onSubmit({
            emailFrom,
            emailTo
        })
        
        setEmailFrom('')
        setEmailTo('')

    }
    
    return (
        <form onSubmit={sendEmailHandler} className="p-4 flex flex-col items-center justify-center space-y-4 border-2 border-gray-500 my-4 rounded-md">
            <p className="text-gray-600">You can also send the link through mail directly</p>
            <input onChange={emailFromHandler} type="email" placeholder="Email From" className="p-2 w-full rounded-md text-gray-600 focus:outline-none focus:ring focus:ring-gray-500" required/>
            <input onChange={emailToHandler} type="email" placeholder="Email To" className="p-2 w-full rounded-md text-gray-600 focus:outline-none focus:ring focus:ring-gray-500" required />
            {error && <p className="text-gray-600">{error}</p>}
            {props.emailStatus && <p className="text-gray-600">{emailStatus}</p>}
            <button type="submit" className="button w-1/2">Email</button>
        </form>
    )
}

export default EmailForm
