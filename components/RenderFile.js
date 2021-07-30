import Image from "next/image"
import { sizeMb } from "../lib/sizeMb"

const RenderFile = ({file}) => {
    
    const sizeInBytes = sizeMb(+file.sizeInBytes)

    return (
        <div className="flex items-center justify-center w-full p-4  space-x-4">
            <Image src={`/assets/${file.format}.png`} alt="" height={60} width={60} />
            <span className="text-gray-600 text-md">{file.filename}</span>
            <span className="text-gray-600 text-md">{sizeInBytes}</span>
        </div>
    )
}

export default RenderFile
