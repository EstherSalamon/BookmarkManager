import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    });
    const sendAway = useNavigate();
    const [processing, setProcessing] = useState(false);
    const [emailExists, setEmailExists] = useState(false);

    useEffect(() => {

        const checkEmail = async () => {
            const { data } = await axios.get(`/api/users/emailexists?email=${user.email}`);
            setEmailExists(data);
        };

        checkEmail();

    }, [user.email]);

    const onTextChange = e => {
        const copy = { ...user };
        copy[e.target.name] = e.target.value;
        setUser(copy);
    };

    const onButtonClick = async () => {
        setProcessing(true);
        await axios.post('/api/users/signup', { user, Password: user.password });
        sendAway('/');
        setProcessing(false);
    };

    return (
        <div style={{ backgroundColor: 'darkorchid' }}>
            <div className='container' style={{ marginTop: 80 }}>
                <div className='col-md-6 offset-3'>
                    <br />
                    <br />
                <br/>
                    <div className='card bg-light'>
                        <div className='card-header'>
                            <h1>Sign Up Here</h1>
                        </div>
                        <div className='card-body'>
                            <input type='text' name='name' value={user.name} placeholder='Name' onChange={onTextChange} className='form-control' />
                            <br />
                            {emailExists && <h6 style={{color: 'red'} }>Email unavailable. Try a different one.</h6> }
                            <input type='email' name='email' value={user.email} placeholder='Email' onChange={onTextChange} className='form-control' />
                            <br />
                            <input type='password' name='password' value={user.password} placeholder='Password' onChange={onTextChange} className='form-control' />
                            <br />
                        </div>
                        <div className='card-footer'>
                            <button className='btn w-100' style={{ backgroundColor: 'darkorchid' }} onClick={onButtonClick}>{processing ? 'Processing...' : 'Sign Up'}</button>
                        </div>
                    </div>
                </div>
                <br />
                <br />
                <br />
            </div>
        </div>
    )

};

export default SignUp;