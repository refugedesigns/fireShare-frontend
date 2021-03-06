import DropZone from "../components/DropZone"
import { useState } from "react"
import RenderFile from "../components/RenderFile"
import DownloadFile from "../components/DownloadFile"
import EmailForm from "../components/EmailForm"
import { Fragment } from "react"
import Head from "next/head"


export default function Home() {
  const [file, setFile] = useState(null)
  const [id, setId] = useState(null)
  const [downloadLink, setDownloadLink] = useState(null)
  const [uploadState, setUploadState] = useState(null)
  const [emailStatus, setEmailStatus] = useState("")
  
  const uploadHandler = async() => {
    
    
    if(uploadState === "Uploading....") {
      return
    }
    
    const formData = new FormData()
    formData.append("myFile", file)
    setUploadState("Uploading....")
    await fetch(`${process.env.BASE_URL}/api/files/upload`, {
      method: "POST",
      body: formData,
    }).then(res => {
      return res.json()
      
    }).then(data => {

      setUploadState("File uploaded :)")
      setId(data.id)
      setDownloadLink(data.downloadLink)
    }).catch(err => {

      setUploadState("Upload failed!")
    })

    setTimeout(() => {
      setUploadState(null)
    }, 1000)
  }

  const resetFile = () => {
    setFile(null)
    setDownloadLink(null)
  }

  const sendEmailHandler = (formData) => {
    fetch(`${process.env.BASE_URL}/api/files/email`, {
      method: "POST",
      body: JSON.stringify({
          id: id,
          emailFrom: formData.emailFrom,
          emailTo: formData.emailTo
      }),
      headers: {
          "Content-Type": "application/json"
      }
  }).then(res => {
      return res.json()
  }).then(data => {
      setEmailStatus(`File sent to ${formData.emailTo}`)
  })
  }

  return (
    <Fragment>
    <Head>
      <title>Fire Share 2.0.0</title>
    </Head>
    <main className="flex flex-col items-center justify-center" >
        <h1 className="my-4 text-3xl font-medium text-gray-600">Got Any File for Sharing? Drop it like its hot!</h1>
        <div className="w-96 flex flex-col items-center bg-gray-200 shadow-xl rounded-xl justify-center">
          {!downloadLink && <DropZone setFile={setFile} />}
         {file && <RenderFile file={{
            format: file.type.split("/")[1],
            filename: file.name,
            sizeInBytes: file.size
          }} />}
          {!downloadLink && file && <button onClick={uploadHandler} className="button">{uploadState ? uploadState : 'Upload'}</button>}
        {downloadLink && (
          
          <div className='flex flex-col items-center justify-center'>
          <DownloadFile downloadLink={downloadLink} />
          <EmailForm onSubmit={sendEmailHandler} emailStatus={emailStatus} />
          <button className="button" onClick={resetFile}>Upload new file</button>
        </div>
        )}
        </div>
    </main>
    </Fragment>
  )
}
