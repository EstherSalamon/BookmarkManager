import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './home.css';

const MyBookmarks = () => {

    const [bookmarks, setBookmarks] = useState([]);
    const [editThisOne, setThisOne] = useState({
        id: '',
        title: '',
        URL: ''
    });

    async function loadData() {
        const { data } = await axios.get('/api/bookmarks/getall');
        setBookmarks(data);
    };

    useEffect(() => {

        loadData();

    }, []);

    const onTextChange = e => {
        const copy = { ...editThisOne };
        copy[e.target.name] = e.target.value;
        setThisOne(copy);
    };

    const onEditClick = (index) => {
        const thisOne = bookmarks[index];
        setThisOne(thisOne);
    };

    const onUpdateClick = async () => {
        await axios.post('/api/bookmarks/update', { Bookmark: editThisOne });
        setThisOne({});
        loadData();
    };

    const onDeleteClick = async id => {
        await axios.post(`/api/bookmarks/delete?id=${id}`);
        loadData();
    };

    return (
        <div className='container' style={{ marginTop: 80 }, { backgroundColor: 'forestgreen' }}>
            <div className='col-md-8 offset-2'>
                <br />
                <h1>These are your bookmarks</h1>
                <hr />
                {!bookmarks.length &&
                    <div className='card'>
                        <div className='card-body'>
                            <h4>You do not have any bookmarks yet. If it pleases you, add some <a href='/add'>here</a>.</h4>
                        </div>
                    </div>
                }
                <br />
                <table className='table table-striped table-hover'>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>URL</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookmarks && bookmarks.map((b, index) =>
                            <tr key={b.id}>
                                {editThisOne.id === b.id ? <>
                                    <td>
                                        <input type='text' name='title' className='form-control' placeholder='Title' value={editThisOne.title} onChange={onTextChange} />
                                    </td>
                                    <td>
                                        <input type='text' name='URL' className='form-control' placeholder='URL' value={editThisOne.url} onChange={onTextChange} />
                                    </td>
                                    <td>
                                        <button className='btn btn-info w-50' onClick={onUpdateClick}>Update</button>
                                        <button className='btn btn-primary w-50' onClick={_ => setThisOne({})}>Cancel</button>
                                    </td>
                                </> : <>
                                    <td>{b.title}</td>
                                    <td>
                                        <a href={b.url.includes('https://') ? b.url : (`https://${b.url}`)}>{b.url.length < 25 ? b.url : (b.url.substring(0, 24) + '...')}</a>
                                    </td>
                                    <td>
                                        <button className='btn btn-warning w-50' onClick={_ => onEditClick(index)}>Edit</button>
                                        <button className='btn btn-danger w-50' onClick={_ => onDeleteClick(b.id)}>Delete</button>
                                    </td>
                                </>}
                            </tr>)}
                    </tbody>
                </table>
                <br />
                <br />
                <br />
            </div>
        </div>
    )
};

export default MyBookmarks;