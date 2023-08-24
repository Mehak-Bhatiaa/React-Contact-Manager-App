import React from 'react';
// creating class component
import {Link} from 'react-router-dom';
// have to use render method with class component
class AddContact extends React.Component {
    state = {
        name:"",
        email:"",
    }
    // creating add method which executes when form is submitted
    add = (e) => {
        // we dont want page to get refreshed when add button is pressed so prevent default
        e.preventDefault();
        if(this.state.name === "" || this.state.email === "") {
            alert("All fields must be filled out.");
            return;
        }
        this.props.addContactHandler(this.state);
        // after contact has been added to list in App component, we clear form fields
        this.setState ({name:"",email:""});
        // console.log(this.state);
        console.log(this.props);
        // redirects to home page
        // this.props.history.push('/');
        window.location.href = `/`;
    }
    render() {
        return(
            <div className='ui main'>
                <Link to="/">
                    <button className='ui button blue right' style={{float:'right'}}>Contact List</button>
                </Link>
                <h2>Add Contact</h2>
                <form className='ui form' onSubmit={this.add.bind(this)}>
                    <div className='field'>
                        <label>Name</label>
                        {/* onChange method returns an event */}
                        <input type='text' name='name' placeholder='name' value={this.state.name} onChange={(e) => this.setState({name: e.target.value})}></input>
                    </div>
                    <div className='field'>
                        <label>Email</label>
                        <input type='text' name='email' placeholder='test@gmail.com' value={this.state.email} onChange={(e) => this.setState({email: e.target.value})}></input>
                    </div>
                    <button className='ui button blue'>Add</button>
                </form>
            </div>
        );
    }
}
// exporting class component
export default AddContact;