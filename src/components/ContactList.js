import React, {useRef} from 'react';
// link is not  default exported component so in curly brackets
import {Link} from 'react-router-dom';
import ContactCard from './ContactCard';

// added default parameter called props
// we use props to send data from parent to child
const ContactList = (props) => {
    // console.log(props);
    // can use useref or event.target.value either works
    const inputElement = useRef("");

    const deleteContactHandler = (id) => {
        props.getContactId(id);
    };
    // creating a render contact list method

    const renderContactList = props.contacts.map((contact) => {
        // return jsx block
        return(
            <ContactCard contact={contact} clickHandler={deleteContactHandler} key = {contact.id}></ContactCard>
        );
    });

    const getSearchTerm = () => {
        console.log(inputElement.current.value);
        props.searchKeyword(inputElement.current.value);
    };

return(
    <div class="main">
        <Link to="/add">
            <button className='ui button blue right' style={{float:'right'}}>Add Contact</button>
        </Link>
        <h2>Contact List</h2>
        <div className='ui search'>
            <div className='ui icon input'>
                <input ref={inputElement} type = "text" name="search" className='prompt' placeholder='Search Contacts' value = {props.term} onChange={getSearchTerm}></input>
                <i className='search icon'></i>
            </div>
        </div>
        <div className='ui celled list'>{renderContactList.length > 0 ? renderContactList: "No contacts matching search results :("}</div>
    </div>
);
};

export default ContactList;