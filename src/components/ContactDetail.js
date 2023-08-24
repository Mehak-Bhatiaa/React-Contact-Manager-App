import React from 'react';
import {Link} from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import user from '../images/666201.png';

const ContactDetail = (props) => {
    const location = useLocation();
    const state = location.state;
    if (!state) {
        // Handle the case when state is undefined
        return <div>No state provided</div>;
    }

    const {name , email} = state;
    return(
        <div className='main'style={{paddingTop:20}}>
            <div style={{margin:'auto', width:76.35}}>
                <Link to="/" style={{margin:'auto'}}>
                    <button className='ui button blue center'>Back</button>
                </Link>
            </div>
            <div className='ui card centered'>
                <div className='image'>
                    <img src={user} alt="user"/>
                </div>
                <div className='content'>
                    <div className='header'>{name}</div>
                    <div className='description'>{email}</div>
                </div>
            </div>
        </div>
    );
}

export default ContactDetail;