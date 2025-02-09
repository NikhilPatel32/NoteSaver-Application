import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import './Home.css'
import { useDispatch, useSelector } from 'react-redux';
import { addToPastes, updateToPastes } from '../features/pasteSlice';
const Home = () => {
    const [title , setTitle] = useState('');
    const [value , setValue] = useState('');
    
    //to get id that we are getting in form of parameters
    const [searchParams , setSearchParams] = useSearchParams();
    const pasteId = searchParams.get("pasteId"); // method to get id from queries we are sending
    const dispatch = useDispatch();

    const allNotes = useSelector((state) => state.paste.pastes);
    useEffect(() =>{
    if(pasteId){
        const note = allNotes.find((n) => n._id === pasteId);
        setTitle(note.title);
        setValue(note.content);
    }
    } , [pasteId])

    function createNotes(){
       // create notes
     const note = {
        title:title,
        content:value,
        _id:pasteId || Date.now().toString(36),
       createdAt:new Date().toISOString(),
       }

       // storing in local storage

       // if id already exist then it is updation

       if(pasteId){
        //update
        dispatch(updateToPastes(note));
       }
       else{
        //create
        dispatch(addToPastes(note));
       }

       //after creation or updation
       setTitle('');
       setValue('');
       setSearchParams({});
    }
  return (
    <div className='home'>

        <div className='search-field'>
      <input 
      className='input-bar'
      type="text" 
      placeholder='Enter Title here...'
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      />

      <button className='search-button'
      onClick={createNotes}
      >
        {
            pasteId ? 'update Note' : 'Create Note'
        }
      </button>
</div>

      <div className='text-input'>
        <textarea 
        className='text-field'
        value={value}
        rows={30}
        placeholder='Enter your notes here...'
        onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </div>
  )
}

export default Home
