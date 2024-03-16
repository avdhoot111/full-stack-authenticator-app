import React from 'react'

const Register = () => {
  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
        <div className='bg-white p-3 rounded w-25'>
        <h2>Sign Up</h2>
        <form>
            <div className='mb-3'>
                <label htmlFor='name'><strong>Name</strong></label>
                <input type='text' placeholder='Enter name' name='name' className='form-control rounded-0'  />
            </div>
            <div className='mb-3'>
                <label htmlFor='email'><strong>Email</strong></label>
                <input type='email' placeholder='Enter Email' name='email' className='form-control rounded-0'  />
            </div>
            <div className='mb-3'>
                <label htmlFor='password'><strong>Password</strong></label>  
                <input type='password' placeholder='Enter Password' name='password' className='form-control rounded-0'  />
            </div>
            <button type='submit' className='btn btn-success w-100 rounded-0'>Sign Up</button>
            <span className='p-4'>Already Have an account??</span>
            <button className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Login</button>
        </form>
        </div>
    </div>
  )
}

export default Register