import React, { useContext, useEffect, useState } from 'react'
import ReactStars from 'react-stars'
import { reviewsref, db } from '../Firebase/Firebase'
import { addDoc, doc, updateDoc, query, where, getDocs } from 'firebase/firestore'
import { TailSpin, ThreeDots } from 'react-loader-spinner'
import swal from 'sweetalert'
import { Appstate } from '../App'
import { useNavigate } from 'react-router-dom'

const Review = ({ id, prevRating, userRated }) => {
    const [rating, setRating] = useState(0);
    const [loading, setloading] = useState(false);
    const [form, setform] = useState("")
    const [reviewdata, setrd] = useState([]);
    const [rwload, setrwl] = useState(false);
    const useAppstate = useContext(Appstate);
    const navigate = useNavigate();
    const [newAdded, setnewAdded] = useState(0);

    const sendreview = async () => {
        if (useAppstate.login) {
            setloading(true);
            await addDoc(reviewsref, {
                movieid: id,
                name: useAppstate.username,
                rating: rating,
                thought: form,
                timestamp: new Date().getTime()
            })
            const ref = doc(db, "movies", id);
            await updateDoc(ref, {
                rating: prevRating + rating,
                rated: userRated + 1
            })
            setloading(false);
            setRating(0);
            setform("");
            setnewAdded(newAdded+1);
            swal({
                title: "Review sent",
                icon: "success",
                buttons: false,
                timer: 3000
            })
        }else{
            navigate("/login");
        }
    }
    useEffect(() => {
        async function getKro() {
            setrwl(true);
            setrd([]);
            let quer = query(reviewsref, where("movieid", "==", id));
            const qexecute = await getDocs(quer);
            qexecute.forEach((doc) => {
                setrd((prev) => [...prev, doc.data()])
            })

            setrwl(false);
        }
        getKro();
    }, [newAdded])
    return (
        <div className='mt-4 border-t-2 border-gray-700 w-full'>
            <ReactStars
                size={30}
                half={true}
                onChange={(rate) => setRating(rate)}
                value={rating}
            />
            <input placeholder='Share your thoughts... '
                className='w-full p-2 outline-none header' value={form} onChange={(e) => setform(e.target.value)} />

            <button onClick={sendreview} className='w-full bg-green-600 p-1 flex justify-center'>
                {loading ? <TailSpin height={20} color="white" /> : "Share"}
            </button>
            {
                rwload ? <div className='mt-6 flex justify-center'><ThreeDots height={10} color="white" /></div> :
                    <div className='mt-4'>
                        {
                            reviewdata.map((e, i) => {
                                return (
                                    <div className='p-2 w-full mt-2 border-b header border-gray-600' key={i}>
                                        <div className='flex items-center'>
                                            <p className='text-blue-500'>{e.name}</p>
                                            <p className='ml-3 text-xs '>({new Date(e.timestamp).toLocaleString()})</p>
                                        </div>
                                        <ReactStars
                                            size={15}
                                            half={true}
                                            edit={false}
                                            value={e.rating}
                                        />
                                        <p>{e.thought}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
            }
        </div>
    )
}

export default Review