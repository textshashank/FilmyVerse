import { getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { ThreeDots } from 'react-loader-spinner';
import ReactStars from 'react-stars'
import { moviesref } from '../Firebase/Firebase';
import { Link } from 'react-router-dom';

const Cards = () => {
  const [data, setData] = useState([])
  
  const [loading, setloading] = useState(false);

  useEffect(()=>{
     setloading(true);
     async function getData(){
        const _data = await getDocs(moviesref);
        _data.forEach((doc)=>{
          setData((prev)=> [...prev, {...(doc.data()), id: doc.id}])
        })
        setloading(false);
     }
     getData();
  },[])
  return (
    <div className='flex flex-wrap p-3 mt-2 contain'>
       {
        loading ? <div className='flex justify-center items-center w-full min-h-screen'><ThreeDots height={40} color="white"/></div> :
        data.map((e,i)=>{
          return(
            
            <div key={i} className='card font-medium shadow-lg p-2 hover:-translate-y-3 cursor-pointer mt-6 transition-all duration-500'>
                <Link to={`/detail/${e.id}`}>
                <img className='h-72 w-full im' src={e.image} alt='bat_photo'/>
                <h1><span className='text-gray-500'>Name:</span> {e.title}</h1>
                <h1 className='flex items-center'><span className='text-gray-500 mr-1'>Rating:</span>
                  <ReactStars 
                    size={20}
                    half={true}
                    value= {e.rating/e.rated}
                    edit={false}
                  />
                </h1>
                <h1><span className='text-gray-500'>Year:</span> {e.year}</h1>
                </Link>
           </div>
          //  </Link>
          )
        })
       }
    </div>
  )
}

export default Cards