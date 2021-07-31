import { useForm } from "react-hook-form";

const EmailForm = (props) => {
    const { register, handleSubmit, reset, formState: {errors}} = useForm()
    
    const sendEmailHandler = (data) => {
 
        props.onSubmit(data)
        
        reset()
    }
    
    return (
        <form onSubmit={handleSubmit(sendEmailHandler)} className="p-4 flex flex-col items-center justify-center space-y-4 border-2 border-gray-500 my-4 rounded-md">
            <p className="text-gray-600">You can also send the link through mail directly</p>
            <input {...register("emailFrom" , {
                required: true,
                pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Entered value does not match email format"
                }
                })} type="email" placeholder="Email From" className="p-2 w-full rounded-md text-gray-600 focus:outline-none focus:ring focus:ring-gray-500" required/>
            {errors.emailFrom && <p className="text-gray-600">{errors.emailFrom.message}</p>}
            <input {...register("emailTo", {
                required: true,
                pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Entered value does not match email format"
                }
                })} type="email" placeholder="Email To" className="p-2 w-full rounded-md text-gray-600 focus:outline-none focus:ring focus:ring-gray-500" required />
            {errors.emailTo && <p className="text-gray-600">{errors.emailTo.message}</p>}
            {props.emailStatus && <p className="text-gray-600">{props.emailStatus}</p>}
            <button type="submit" className="button w-1/2">Email</button>
        </form>
    )
}

export default EmailForm
