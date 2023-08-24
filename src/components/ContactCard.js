import React from 'react';
import {Link} from 'react-router-dom';
import user from '../images/user.png';

const ContactCard = (props) => {
    const {id, name, email } = props.contact;
    const stateToPass = {
        id: id,
        name: name,
        email: email,
      };
    return(
        <div className='item'>
            <div style={{float:'left'}}><img className='ui avatar image'src={user} alt='user'></img></div>
            <div className='content' style={{float:'left'}}>
                <Link to={`/contact/${id}`} state={stateToPass}>
                    <div className='header'>{name}</div>
                    <div>{email}</div>
                </Link>
            </div>
            {/* we don't use hyphens while writing in jsx */}
            <i className='trash alternate outline icon' style={{float:'right', color:'red', marginTop:'7px' , marginLeft:'10px'}} onClick={() => props.clickHandler(id)}></i>
            <Link to={`/edit`} state={stateToPass}>
            <i className='edit alternate outline icon' style={{float:'right', color:'blue', marginTop:'7px', marginLeft:'10px'}}></i>
            </Link>
        </div>
    );
}

export default ContactCard;