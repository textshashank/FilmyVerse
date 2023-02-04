import React, { useEffect, useState } from 'react'
import ReactStars from 'react-stars'
import { useParams } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db, moviesref } from '../Firebase/Firebase'
import { ThreeCircles } from 'react-loader-spinner'
import Review from './Review'


const Detail = () => {
    const { id } = useParams();
    const [data, setData] = useState({
        title: "",
        year: "",
        image: "",
        description: "",
        rating: 0,
        rated: 0
    })
    const [loading, setloading] = useState(false);
    useEffect(() => {
        setloading(true);
        async function getData() {
            const _doc = doc(db, "movies", id);
            const _data = await getDoc(_doc);
            setData(_data.data())
            setloading(false);
        }
        getData();
    }, [])
    return (
        
    <div className='p-4 flex flex-col md:flex-row items-center md:items-start justify-center w-full mt-4'>
        { loading ? <div className='h-96 w-full flex justify-center items-center'><ThreeCircles color='white' /></div> :
        <>
        <img className='h-96 block md:sticky top-24' src={data.image} />
        <div className='md:ml-4 ml-0 w-full md:w-1/2'>
            <h1 className='text-3xl font-bold text-gray-400'>{data.title} <span className='text-xl'>({data.year})</span></h1>
            <ReactStars
                size={20}
                half={true}
                value={data.rating/data.rated}
                edit={false}
            />
            <p className='mt-3'>
                {data.description}
            </p>
            <Review id={id} prevRating={data.rating} userRated={data.rated}/>
        </div>
        </>
}
    </div>

    )
}

export default Detail