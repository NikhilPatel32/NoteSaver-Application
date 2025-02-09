import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';
export const pasteSlice = createSlice({
  name: 'paste',
  initialState: {
    pastes:localStorage.getItem("pastes")
    ? JSON.parse(localStorage.getItem("pastes"))
    : []
  },
  reducers: {
   addToPastes : (state , action) => {
    // fetching note data
    const note = action.payload;

    // adding in existing pastes list
    state.pastes.push(note);

    //adding in local storage
    localStorage.setItem("pastes" , JSON.stringify(state.pastes));
    toast("Notes Created Successfully");
    },
    updateToPastes: (state , action) => {
     // get note
     const note = action.payload;
     const index = state.pastes.findIndex((item) => 
    item._id === note._id);

     if(index >= 0){
        state.pastes[index] = note;
        localStorage.setItem("pastes" , JSON.stringify(state.pastes));

        toast.success("note updated");
     }
     else{
        alert("note does not exit");
     }
    },
    resetAllPastes: (state, action) => {
      // reset state to empty list
      state.pastes = [];
      
      //remove from local storage
      localStorage.removeItem("pastes");
    },
    removeFromPastes:(state , action) => {
        const noteId= action.payload;
        const index = state.pastes.findIndex((item) => 
       item._id === noteId);
   
        if(index >= 0){
           state.pastes.splice(index , 1);
           localStorage.setItem("pastes" , JSON.stringify(state.pastes));
   
           toast.success("note deleted");
        }
        else{
           alert("note does not exit");
        }
    }
  }
})

// Action creators are generated for each case reducer function
export const { addToPastes, updateToPastes, resetAllPastes , removeFromPastes } = pasteSlice.actions

export default pasteSlice.reducer