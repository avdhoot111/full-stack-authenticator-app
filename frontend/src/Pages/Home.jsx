import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    const [auth, setAuth] = useState(false);
    const [name, setName] = useState('');
    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get('http://localhost:7000')
        .then((res) => {
            console.log(res, 'response')
            if(res.data.Status === 'Success') {
                setAuth(true);
                setName(res.data.name);
            }else {
                setAuth(false);
            }
        })
        .catch((err) => console.log(err, 'error'));
    })

    const handleLogout = () => {
        axios.get('http://localhost:7000/logout') 
        .then((res) => {
            window.location.reload();
        })
        .catch((err) => {
            console.log('Error Logging out')
        })
    }

    return (
        <div className='container mt-4'>
            {
                auth ? 
                <div>
                    <h3>You are Authorised --- {name}</h3>
                    <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
                </div> 
                : 
                <div>
                    <h3>You are not Authenticated.</h3>
                    <h3>Login Now</h3>
                    <Link to="/login" className='btn btn-primary'>Login</Link>
                </div>
            }
        </div>
    )
    }

export default Home