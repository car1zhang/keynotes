"use client"
import Link from 'next/link'
import React from 'react'
import BackButton from "../../images/back.png"
import Image from 'next/image'

export default function Note({ params }: { params: { _id: string }}) {

  const [title, setTitle] = React.useState("")
  const [date, setDate] = React.useState(new Date())
  const [description, setDescription] = React.useState("")
  const [notes, setNotes] = React.useState("")
  const [recordingId, setRecordingId] = React.useState("")

  React.useEffect(() => {
    fetch('http://127.0.0.1:8000/notes/'+params._id+'/', {'cache': 'no-store'}).then(res => res.json()).then(data => {
      setTitle(data.title)
      setDate(new Date(data.date))
      setDescription(data.description)
      setNotes(data.notes)
      setRecordingId(data.recording_id)
    })
  })

  return (
    <div>

    <div className="px-72">


      {title.length > 0 ?
      <div className="my-8 text-black">
        
        <Link href="/calendar"><h1 className='hover:border-[#7C2D12] bg-transparent hover:bg-red-500/50 hover:text-[#7C2D12] '> ← Back </h1> </Link>
        <h1 className="mb-3 mt-3 font-serif text-3xl font-bold">{title}</h1>
        <div className="flex justify-between items-center">
          <h2 className="mb-3 font-serif text-md">{description}</h2>
          <h2 className="mb-3 font-serif text-md">{date.toLocaleDateString()}</h2>
        </div>
        <hr className="mb-3" />
        <p className="mb-6 font-serif text-md">{notes}</p>
        <Link href='/calendar/' className="text-black hover:border-[#7C2D12] bg-transparent hover:bg-red-500/50 hover:text-[#7C2D12] text-center border border-solid border-black p-2 lg:px-4 rounded duration-300 transition-colors"
          data-test-id={`navbar-logout`}
          onClick={async () => await fetch('http://127.0.0.1:8000/notes/'+params._id+'/', {
            method: "DELETE",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin"
          })}>Delete</Link>
      </div>
      : ''}
    </div>
    </div>
  )
}