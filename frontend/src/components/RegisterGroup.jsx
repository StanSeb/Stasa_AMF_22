import { useState } from "react";
import React from 'react'
import axios from 'axios'

const RegisterGroup = () => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const group = { title};

    fetch('localhost:8080/groups...', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: (group)
    }).then(() => {
      console.log('new group created');
    })
  }

  return (
    <div className="create">
      <h2>Create a group</h2>
      <form onSubmit={handleSubmit}>
        <label>Group title:</label>
        <input 
          type="text" 
          required 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        
        <button>Create</button>
      </form>
    </div>
  );
}
 
export default RegisterGroup;