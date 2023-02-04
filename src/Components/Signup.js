import React, { useState } from 'react'
import { TailSpin } from 'react-loader-spinner'
import { Link } from 'react-router-dom';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import app from "../Firebase/Firebase";
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import { addDoc } from 'firebase/firestore';
import { usersref } from '../Firebase/Firebase';






const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    password: ""
  })
  const [loader, setLoder] = useState(false);
  const [otpsent, setOtpsent] = useState(false);
  const [otp, setotp] = useState("");
  const navigate = useNavigate();

  const auth = getAuth(app);
  const generateRecaptha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
      'size': 'invisible',
      'callback': (response) => {

      }
    }, auth);
  }

  const requestotp = async () => {
    setLoder(true);
    generateRecaptha();
    let appVerifier = window.recaptchaVerifier;
    await signInWithPhoneNumber(auth, `+91${form.mobile}`, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        swal({
          title: "OTP Sent",
          icon: "success",
          buttons: false,
          timer: 3000
        })
      });
    
    setLoder(false);
    setOtpsent(true);

  }

  const verifyotp = () => {
    setLoder(true);
    window.confirmationResult.confirm(otp).then((result) => {
      uploaddata();
      swal({
        title: "Successfully Registered",
        icon: "success",
        buttons: false,
        timer: 3000
      })
      setLoder(false);
      navigate("/login");
    })
  }

  const uploaddata = async () => {
    addDoc(usersref, {
      name: form.name,
      mobile: form.mobile,
      password: form.password
    })
  }
  return (

    <div className='w-full flex flex-col mt-10 items-center'>
      <h1 className='text-xl font-bold'>Signup</h1>
      {otpsent ?
        <>
          <div class="p-2 w-full md:w-1/3">
            <div class="relative">
              <label for="message" class="leading-7 text-sm text-gray-300">OTP</label>
              <input id="message" name="message" value={otp} onChange={(e) => setotp(e.target.value)} class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
          </div>
          <div class="p-2 w-full mt-4">
            <button onClick={verifyotp} class="flex mx-auto text-white bg-green-600 border-0 py-2 px-8 focus:outline-none hover:bg-green-700 rounded text-lg">{loader ? <TailSpin height={25} color="white" /> : 'Confirm OTP'}</button>
          </div>
        </>
        : <>
          <div class="p-2 w-full md:w-1/3">
            <div class="relative">
              <label for="message" class="leading-7 text-sm text-gray-300">Name</label>
              <input id="message" name="message" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
          </div>
          <div class="p-2 w-full md:w-1/3">
            <div class="relative">
              <label for="message" class="leading-7 text-sm text-gray-300">Mobile No.</label>
              <input type={"Number"} id="message" name="message" value={form.mobile} onChange={(e) => setForm({ ...form, mobile: e.target.value })} class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
          </div>
          <div class="p-2 w-full md:w-1/3">
            <div class="relative">
              <label for="message" class="leading-7 text-sm text-gray-300">Password</label>
              <input type={"password"} id="message" name="message" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
          </div>
          <div class="p-2 w-full mt-4">
            <button onClick={requestotp} class="flex mx-auto text-white bg-green-600 border-0 py-2 px-8 focus:outline-none hover:bg-green-700 rounded text-lg">{loader ? <TailSpin height={25} color="white" /> : 'Request Otp'}</button>
          </div>
        </>
      }
      <p className='mt-4'>Already have an account? <Link to={'/login'}><span className='text-blue-500'>Login</span></Link></p>
      <div id='recaptcha-container'></div>
    </div>

  )
}

export default Signup;