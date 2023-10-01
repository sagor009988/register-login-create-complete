import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import auth from '../../firebase';
import { FaRegEyeSlash ,FaRegEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';


const Register = () => {

    const [error,setError]=useState('')
    const [create,setCreate]=useState('')
    const [showPasseord,setShowPassword]=useState(false)

    const handleRegisterSubmit=e=>{
        e.preventDefault();
       const email=e.target.email.value
        const password=e.target.password.value;
        const name=e.target.name.value
        const accept=e.target.terms.checked
        setError('')
        setCreate('')
        
        if(password.length<6 ){
            setError('password should be at least 6 characters')
            return
        }
        else if(!/[A-Z]/.test(password)){
            setError('please inter One Captital leter')
            return
        }else if(!accept){
            setError('accept our terms and conditions')
            return
        }
        
        
       
        
        createUserWithEmailAndPassword(auth,email,password)
        .then(result=>{
            console.log(result.user);
            setCreate('A new account Create successfully')

            updateProfile(result.user,{
                displayName:'',photoURL:''
            })
            .then(()=>{
                console.log('profile Update successfully');
            })
            .catch(error=>{
                console.log(error);
            })


            sendEmailVerification(result.user)
            .then(()=>{
                alert('check your email to verification')
            })
        })
        .catch(Error=>{
            console.log('error',Error.message);
            setError('email-already-in-use')
        })


    }
    return (
        <div className='border-4'>
            <div className='mx-auto md:w-2/4'>
            <h1 className='text-3xl font-bold pt-5 pb-5'>please Register Here</h1>
            <form onSubmit={handleRegisterSubmit}>
                <input className='bg-slate-300 border-2 w-2/4 border-black p-2'  type="text" name='name' placeholder='User Name' /> <br  /> <br />
                <input className='bg-slate-300 border-2 w-2/4 border-black p-2'  type="email" name='email' placeholder='Email' required/> <br /> <br />
                <div className='relative'>
                <input className='bg-slate-300 border-2 w-2/4 border-black p-2'  type={showPasseord?'text':'password'} name="password" id="" placeholder='password' required /> <span className='absolute top-4  right-96' onClick={()=>setShowPassword(!showPasseord)}>
                    {
                    showPasseord?<FaRegEyeSlash></FaRegEyeSlash>:<FaRegEye></FaRegEye>
                    } 
                    </span> 
                </div>
            <br /> 
             <input type="checkbox" name="terms" id="" />
             <label htmlFor="terms">PLease Accept out <a href="">Terms and conditions</a> </label>
             <br /> <br />
                <input  className='btn btn-secondary w-2/4 ' type="submit" value="REGISTER" />
                <p>Already Have An account?please <Link to={'/login'} className='font-bold'>Login</Link> </p>
            </form>
            {
                error && <p className='text-3xl font-bold text-red-600'>{error}</p>
            }
            {
                create && <p className='text-3xl font-bold text-green-600'>{create}</p>
            }
            </div> <br />
        </div>
    );
};

export default Register;