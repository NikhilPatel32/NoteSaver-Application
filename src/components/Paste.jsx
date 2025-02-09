import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './Paste.css'
import { removeFromPastes } from '../features/pasteSlice';
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';
const Paste = () => {

    // array of all saved notes
    const notes = useSelector((state) => state.paste.pastes);
    const [searchTerm , setSearchTerm] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // note searching logic
    const filterData = notes.filter((note) => 
        (note.title || '').toLowerCase().includes((searchTerm || '').toLowerCase()));

    //delete
    function handleDelete(pasteId){
       dispatch(removeFromPastes(pasteId)); 
    }

   //share
   const handleShare = (note) => {
    const noteContent = `Title: ${note.title}\n\nContent: ${note.content}\n\nDate: ${new Date(note.createdAt).toLocaleString()}`;

    // Check if the Web Share API is supported
    if (navigator.share) {
      navigator
        .share({
          title: note.title,
          text: noteContent,
        })
        .then(() => {
          console.log('Note shared successfully!');
          toast.success("Note shared successfully!");
        })
        .catch((error) => {
          console.error('Error sharing the note:', error);
          toast.error("Failed to share the note.");
        });
    } else {
      // Fallback: Copy the content to the clipboard
      navigator.clipboard.writeText(noteContent).then(() => {
        alert('Note content copied to clipboard!');
        toast.success("Note content copied to clipboard!"); 
      });
    }
  };

  //handling view page
  function handleViewClick(note_id){
    navigate(`/pastes/${note_id}`);
  }

  //handling edit
  function handleEdit(note_id){
    navigate(`/?pasteId=${note_id}`);
  }

  return(
    <div className='container'>
      <input 
      type="text" 
      className='searchbar'
      placeholder='search here...'
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className='filtered-data'>
        {
        filterData.length == 0 ? (
                    <div className='empty-box'>Your Notes List is empty</div>
                )
        : (filterData.length > 0 && filterData.map((note) => {
            return(
    <div className='note-box' key={`${note.id}-${note.createdAt}`}>
      <div className='top-level'>

        <div className='title'>
        {note.title}
        </div>

        <div className='tools'>
            <button className='edit-button' onClick={() => {handleEdit(note._id)}}></button>
            <button className='view-button' onClick={ () => {handleViewClick(note._id)}}>
            </button>
            <button className='delete-button' onClick={() => {handleDelete(note._id)}}></button>
            <button className='copy-button' onClick={() => 
                {navigator.clipboard.writeText(note.content);
                toast.success("copied to clipboard");}}>    
            </button>
            <button className='share-button' onClick={() => {handleShare(note)}}></button>
        </div>
      </div>

      <div className='content'>
        {note.content}
      </div>

      <div className='date'>
      {note.createdAt}
      </div>

      </div>
       )
        }
        )
    )
      }
      </div>
      </div>
  )
}

export default Paste
