import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const Home = () => {

    const [bookmarks, setBookmarks] = useState([]);

    useEffect(() => {

        const loadData = async () => {
            const { data } = await axios.get('/api/bookmarks/top5');
            setBookmarks(data);
        };

        loadData();

    }, []);

    function getGuid() {
        return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
            (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
        );
    }

    return (
        <div className='container' style={{ marginTop: 80 }}>
            <div className='col-md-6 offset-3'>
                <h3>These are the top 5 most common URLs bookmarked</h3>
                <hr />
                <table className='table table-striped table-hover'>
                    <thead>
                        <tr>
                            <th>URL</th>
                            <th>Count</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookmarks && bookmarks.map(b => 
                            <tr key={getGuid()}>
                                <td>{b.url.length < 25 ? b.url : (b.url.substring(0, 24) + '...')}</td>
                                <td>{b.count}</td>
                            </tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Home;