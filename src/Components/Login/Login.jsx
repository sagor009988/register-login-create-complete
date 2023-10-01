import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import auth from '../../firebase';
import { Link } from 'react-router-dom';

const Login = () => {
    const [error,setError]=useState('')
    const [successfully,setSuccessfully]=useState()
    const emailRef=useRef()

    const handleLogin=e=>{
        e.preventDefault();
     const email=e.target.email.value;
     const password=e.target.password.value;
     console.log(email,password);
     setError('')
     setSuccessfully('')
     signInWithEmailAndPassword(auth, email, password)
     .then(result=>{
        console.log(result.user);
        if(result.user.emailVerified){
            setSuccessfully('your login successfull')
        }else
        {
            alert('check your email and verify this')
        }
     })
     .catch(Error=>{
        setError('Incorrect Password . please correct password');
     })
     
    }
    const handleReset=()=>{
        const email=emailRef.current.value;
        if(!email){
            console.log('reset email',emailRef.current.value);
            return
        }
        else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email))
        {
            console.log('please inter a valid email');
            return
        }
        sendPasswordResetEmail(auth,email)
        .then(result=>{
            alert('please check ur email')
        })
        .catch(Error=>{
            setError('please resend email')
        })
    }

    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Login now!</h1>
      <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
    </div>
    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <div className="card-body">

       <form onSubmit={handleLogin}>
       <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input 
          type="email" 
          name='email' 
          ref={emailRef}
          placeholder="email" 
          className="input input-bordered" />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" name='password' placeholder="password" className="input input-bordered" />
          <label className="label">
            <a onClick={handleReset} href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Login</button>
        </div>
        <p>New to this webside?please <Link to={'/register'} className='font-bold '>REGISTER</Link></p>
       </form>
       {
        error && <p>{error}</p>
       }
       {
        successfully && <p>{successfully}</p>
       }

      </div>
    </div>
  </div>
</div>
        </div>
    );
};

export default Login;