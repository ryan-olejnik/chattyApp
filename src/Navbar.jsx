import React, {Component} from 'react';
function Navbar(props){


  return (
    <nav className='navbar'>
      <a href="/" className='navbar-brand'>Chattyyyyyyyyyy</a>
      <form onSubmit={props.openConnection} onSubmit={props.openConnection}>
        <input 
        type='text' 
        name='username' 
        className='chatbar-username'
        defaultValue={props.currentUser}  ></input>
        <button type='submit'>Connect / Change Username</button>
      </form>
    </nav>
    );
}

export default Navbar;