import { useState } from "react"

const EmailForm = ({id}) => {
    const [emailFrom, setEmailFrom] = useState('')
    const [emailTo, setEmailTo] = useState('')
    const [error, setError] = useState(null)
    const [emailStatus, setEmailStatus] = useState("")
    
    const emailFromHandler = event => {
        setEmailFrom(event.target.value)
    }

    const emailToHandler = event => {
        setEmailTo(event.target.value)
    }
    
    const sendEmailHandler = async(event) => {
        event.preventDefault()
        
        if(emailFrom.trim() === '' || emailTo.trim() === '') {
            setError("You inputs are incorrect, please check and try again.")
            return
        }
        
        await fetch(`${process.env.BASE_URL}/api/files/email`, {
            method: "POST",
            body: JSON.stringify({
                id: id,
                emailFrom: emailFrom,
                emailTo: emailTo
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
          .then(data => {
            console.log(data)
            setEmailStatus(`File sent to ${emailTo}`)
            
            })
          .catch(err => console.log(err))

        setEmailFrom('')
        setEmailTo('')

    }
    
    return (
        <form onSubmit={sendEmailHandler} className="p-4 flex flex-col items-center justify-center space-y-4 border-2 border-gray-500 my-4 rounded-md">
            <p className="text-gray-600">You can also send the link through mail directly</p>
            <input onChange={emailFromHandler} type="email" placeholder="Email From" className="p-2 w-full rounded-md text-gray-600 focus:outline-none focus:ring focus:ring-gray-500" required/>
            <input onChange={emailToHandler} type="email" placeholder="Email To" className="p-2 w-full rounded-md text-gray-600 focus:outline-none focus:ring focus:ring-gray-500" required />
            {error && <p className="text-gray-600">{error}</p>}
            {emailStatus && <p className="text-gray-600">{emailStatus}</p>}
            <button type="submit" className="button w-1/2">Email</button>
        </form>
    )
}

export default EmailForm
