// importing useState react hook
// we must use local storage so data persists between refreshes, so importing useEffect react hook
import React, {useState, useEffect} from 'react';
// we want to display add contacts and contact list on seperate pages
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
// want to give each contact a unique id so we can delete it, so we do npm i uuidv4 and then import it
import {v4} from 'uuid';
import api from '../api/contacts';
import './App.css';
import Header from "./Header";
import AddContact from "./AddContact";
import EditContact from './EditContact';
import ContactCard from "./ContactCard";
import ContactList from "./ContactList";
import ContactDetail from './ContactDetail';





function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  // initialise contacts to empty array
  // const [contacts, setContacts] = useState(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) ?? []);
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults,setSearchResults] = useState([]);

  // Retrieve contacts
  const retrieveContacts = async () => {
    const response = await api.get("/contacts");
    return response.data;
  };


  // this function will get a contact from the AddContact component
  const addContactHandler = async (contact) => {
    console.log(contact);
    // adding new contact to list, updating state
    // ... is rest operator
    // setContacts([...contacts, contact]);

    // code to add new contact to json api post call
    // ... is to destructure contact
      const request = {
        id:v4(),
        ...contact
      }

      const response = await api.post("/contacts", request)
    // end of code to make change to json 
    // setContacts([...contacts,{id: v4(), ...contact}]);
    setContacts([...contacts,response.data]);
  };

  const updateContactHandler = async (contact) => {
    const response = await api.put(`/contacts/${contact.id}`, contact);
    const {id, name, email} = response.data;
    setContacts(contacts.map(contact => {
      // if id matches update contact otherwise return old contact list
      return contact.id === id ? {...response.data} : contact;
    }));
  };
  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`);
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });
    setContacts(newContactList);
  };

  const searchContactHandler = (searchTerm) => {
    // console.log(searchTerm);
    setSearchTerm(searchTerm);
    if(searchTerm !== "") {
      const newContactList = contacts.filter((contact) => {
        // Object.values(contact) gives us the 3 values that each contact has which is the name id email
        // using join clubs those 3 values into 1 string seperated by a space, so we can search for match in just 1 value as opposed to 3, so user can search by name email or id in same search bar
        return Object.values(contact)
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      });
      // now update state of search results
      setSearchResults(newContactList);
    }
    else {
      setSearchResults(contacts);
    }
  };
  
  useEffect(() => {
    // retrieving contacts from local storage
  //   const retrieveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  //   if(retrieveContacts) setContacts(retrieveContacts);
    const getAllContacts = async () => {
      const allContacts = await retrieveContacts();
      if(allContacts) setContacts(allContacts);
    };

    getAllContacts();
  },[]);

  // adding new contact to local storage
  // useEffect(() => {
  //   localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  // },[contacts]);

  // const contacts = [{
  //   id:"1",
  //   name: "Mehak",
  //   email:"mabhatia@usc.edu"
  // },
  // {
  //   id:"2",
  //   name: "Edward",
  //   email:"edsheer@usc.edu"
  // }
  // ];

  return (
    <div className="ui container">
      <Router>
        {/* custom html component */}
        <Header/> 
        <Routes>
          {/* exact matches with exact path */}
          {/* dont want to use arrow function to create component everytime instead of just updating it as that causes performance issues */}
          {/* <Route path="/" exact Component ={() => <ContactList contacts={contacts} getContactId={removeContactHandler}/>}/> */}
          {/* so we use render prop instead */}
          <Route path="/" exact Component={ (props) => (
            <ContactList 
              {...props}
              contacts={searchTerm.length < 1 ? contacts : searchResults} 
              getContactId={removeContactHandler}
              term={searchTerm}
              searchKeyword={searchContactHandler}
            />
          )}/>
          {/* {..props}  destructures props*/}
          <Route path="/add" Component={(props) => (
            <AddContact 
              {...props}
              addContactHandler={addContactHandler}
            />
          )}/>
          <Route path="/edit" Component={(props) => (
            <EditContact 
              {...props}
              updateContactHandler={updateContactHandler}
            />
          )}/>
          <Route path="/contact/:id" Component={ContactDetail}/>
        </Routes>
        {/* passing a function as a prop */}
        {/* <AddContact addContactHandler={addContactHandler}/>
        {/* passing in contactys array as a prop from parent to child */}
        {/* <ContactList contacts={contacts} getContactId={removeContactHandler}/> */}
      </Router>
    </div>
  );
}

export default App;
