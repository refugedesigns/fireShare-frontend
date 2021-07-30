import Image from "next/image"


const DownloadFile = ({downloadLink}) => {
    return (
        <div className="px-4 flex flex-col items-center justify-center space-y-4">
            <h1 className="my-2 font-medium text-lg text-gray-600">Download your file here :)</h1>
            <div className="flex space-x-3">
                <span className="break-all text-sm text-gray-600 font-medium">{downloadLink}</span>
                <div className="cursor-pointer"><Image src="/assets/copy.png" alt="" height={50} width={50} onClick={ () => navigator.clipboard.writeText(downloadLink)} /></div>
            </div>
        </div>
    )
}

export default DownloadFile
