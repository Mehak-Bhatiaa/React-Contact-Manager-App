import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const EditContact = (props) => {
  const location = useLocation();
  const prev_state = location.state;

  //   if (!prev_state) {
//     // Handle the case when state is undefined
//     return <div>No state provided</div>;
// }
  const [contact, setContact] = useState({
    id: prev_state.id,
    name: prev_state.name,
    email: prev_state.email,
  });

  const updateContact = (e) => {
    e.preventDefault();
    if (contact.name === "" || contact.email === "") {
      alert("All fields must be filled out.");
      return;
    }

    props.updateContactHandler(contact);
    console.log(contact);
    setContact({ name:contact.name , email: contact.email});
    window.location.href = `/`;
  };

  return (
    <div className='ui main'>
      <Link to="/">
        <button className='ui button blue right' style={{ float: 'right' }}>Contact List</button>
      </Link>
      <h2>Edit Contact</h2>
      <form className='ui form' onSubmit={updateContact}>
        <div className='field'>
          <label>Name</label>
          <input
            type='text'
            name='name'
            placeholder='Name'
            value={contact.name}
            onChange={(e) => setContact({ ...contact, name: e.target.value })
          }
          />
        </div>
        <div className='field'>
          <label>Email</label>
          <input
            type='text'
            name='email'
            placeholder='test@gmail.com'
            value={contact.email}
            onChange={(e) => setContact({ ...contact, email: e.target.value })}
          />
        </div>
        <button className='ui button blue'>Save</button>
      </form>
    </div>
  );
}

export default EditContact;




