import React from 'react'
import './Home.css'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
const ViewPaste = () => {

    //get id using useparams
    const {id} = useParams();

    const allNotes = useSelector((state) => state.paste.pastes);

    const note = allNotes.find((n) => n._id === id);

    console.log("final note" , note);
  return (
 <div>
 <div className='home'>

<div className='search-field'>
<input 
className='input-bar'
type="text" 
placeholder='Enter Title here...'
value={note.title}
disabled
/>
</div>

<div className='text-input'>
<textarea 
className='text-field'
value={note.content}
rows={30}
disabled
placeholder='Enter your notes here...'
/>
</div>
</div>
</div>
  )
}

export default ViewPaste
