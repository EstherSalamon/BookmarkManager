import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Add() {

    const [title, setTitle] = useState('');
    const [URL, setURL] = useState('');
    const navigate = useNavigate();

    const onButtonClick = async () => {
        const bookmark = {
            title,
            URL
        };
        await axios.post('/api/bookmarks/add', { bookmark });
        navigate('/mybookmarks');
    };

    return (
        <div style={{ backgroundColor: 'mediumseagreen' }}>
            <div className="container" style={{ marginTop: 80 }}>
                <br />
                <br />
            <br/>
                <div className='col-md-6 offset-3'>
                    <div className='card'>
                        <div className='card-header'>
                            <h2>Add a bookmark</h2>
                        </div>
                        <div className='card-body align-items-center'>
                            <input type='text' name='title' placeholder='Title' value={title} onChange={e => setTitle(e.target.value)} className='form-control' />
                            <br />
                            <input type='text' name='URL' placeholder='URL' value={URL} onChange={e => setURL(e.target.value)} className='form-control' />
                        </div>
                        <div className='card-footer'>
                            <button className='btn btn-light w-100' onClick={onButtonClick} style={{backgroundColor: 'mediumseagreen'} }>Add</button>
                        </div>
                    </div>
                    <br />
                    <br />
                    <br />
                </div>
            </div>
        </div>
    );

};

export default Add;