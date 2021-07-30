import RenderFile from "../../components/RenderFile";
import Image from "next/image"
import fileDownload from "js-file-download";
import axios from "axios";


export default function FileDownloadPage({data}) {
    const { filename, format, sizeInBytes, id } = data
    
    const downloadHandler = async() => {

        const res = await fetch(`${process.env.BASE_URL}/api/files/download/${id}`)
        const data = await res.blob()
        

        fileDownload(data, filename)
    }
    return (
        <div className="flex flex-col items-center justify-center py-4 space-y-4 bg-gray-200 rounded-md shadow-xl w-96">
            {!id ? <span>Oops! File does not exist! check the URL</span> : <>
            
                <div><Image src="/assets/folder.png" alt="" height={60} width={60} /></div>
                <h1 className="text-xl text-gray-600">Your file is ready to be downloaded</h1>
                <RenderFile file={{ format, filename, sizeInBytes}}  />
                <button className="button" onClick={downloadHandler}>Download</button>
             </>}
        </div>
    )
}

export async function getServerSideProps(context) {
    const { id } = context.params
    let data;
    try {
        data = await fetch(`${process.env.BASE_URL}/api/files/${id}`).then(res => res.json()).catch(err => console.log(err))
    }catch(err) {
        console.log((err))
        data = {}
    }

    console.log(data)

    return {
        props: {
            data,
        }
    }
}

