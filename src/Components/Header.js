import React, { useContext } from 'react'
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { Appstate } from '../App';

const Header = () => {
  
  const useAppstate = useContext(Appstate);


  return (
    <div className='sticky top-0 z-10 bg-black text-3xl flex justify-between items-center text-red-500 font-bold p-3 border-b-2 border-gray-500'>
        <Link to={'/'}><span>Filmy<span className='text-white'>Verse</span></span></Link>
        {
          useAppstate.login ? 
          <Link to="/addmovie">
          <Button>
             <h1 className='text-lg text-white flex items-center cursor-pointer'>
                <AddIcon className='mr-1' color='inherit'/>  Add New
             </h1>   
          </Button>
        </Link> :
        <Link to="/login">
          <h1 className='text-lg bg-green-500 cursor-pointer flex items-center'>
            <Button><span className='text-white font-medium capitalize'>Login</span></Button>
          </h1>
      </Link>
        }
    </div>
  )
}

export default Header