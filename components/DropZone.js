import { useDropzone } from "react-dropzone"
import { useCallback } from "react"
import Image from "next/image"


const DropZone = ({setFile}) => {

    const onDrop = useCallback(
        (acceptedFile) => {
            setFile(acceptedFile[0])
            console.log(acceptedFile)
        },
        [])
    const { getRootProps, getInputProps, isDragAccept, isDragReject } = useDropzone({onDrop, multiple: false, accept: "image/jpeg, image/png, audio/mpeg"})
    
    return (
        <div className="p-4">
            <div {...getRootProps()} className="h-80 w-full rounded-md cursor-pointer focus:outline-none">
                <input {...getInputProps()} />
                <div className={`flex flex-col items-center justify-center h-full border-2 border-dashed border-gray-800 rounded-xl p-4 ${isDragReject ? "border-red-600" : isDragAccept ? "border-green-600" : ''}`}>
                    <Image src="/assets/upload.png" alt="" width={80} height={80} className="mb-4"/>
                    {isDragReject ? <p className="mt-2 text-lg text-gray-600 text-center font-semibold">Sorry, This app only supports images and mp3</p> : <div className="flex flex-col items-center justify-center">
                        <p className="text-gray-600 text-xl">Drop your file here, <span className="text-blue-600 hover:text-blue-600 hover:underline">browse</span></p>
                    <p className="mt-2 text-lg text-gray-600">Only jpeg, png & mp3 files supported</p>
                    </div> }
                    
                </div>
                
            </div>
        </div>
    )
}

export default DropZone
