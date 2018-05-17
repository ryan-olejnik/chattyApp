import React, {Component} from 'react';
function Navbar(props){


  return (
    <nav className='navbar'>
      <a href="/" className='navbar-brand'>Chattyyyyyyyyyy</a>
      <form onSubmit={props.openConnection} onSubmit={props.openConnection}>
        <input 
        id='username-textbox'
        type='text' 
        name='username' 
        className='chatbar-username'
        defaultValue={props.currentUser}  ></input>
        <button id='change-username-button' type='submit'>Connect / Change Username</button>
      </form>
      <p id='number-of-users' >Users Online: {props.numberOfUsersOnline}</p>
    </nav>
    );
}

export default Navbar;