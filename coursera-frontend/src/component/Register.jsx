import { useState } from "react";
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
export function Registeruser(){
      const [user, setUser] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName:''
  });
 const navigate = useNavigate();
    const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

   const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/user/signup', user);
      alert('Registration successful!');
      navigate('/'); // Redirect to login
    } catch (error) {
      console.error('Registration failed:', error.response?.data || error.message);
      alert('Error: ' + (error.response?.data?.message || 'Something went wrong'));
    }
  };

    return <div>
        <h1>Register as User</h1>
        <form onSubmit={handleSubmit} className="space-y-4">

         <input
          type="email"
          name="email"
          placeholder="Email"
          value={user.email}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={user.password}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

            <input
          type="text"
          name="firstName"
          placeholder="firstname"
          value={user.firstName}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          name="lastName"
          placeholder="lastname"
          value={user.lastName}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Register 
        </button>
        </form>
    </div>
}

export function Registeradmin(){
      const [user, setUser] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName:''
  });
 const navigate = useNavigate();
    const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

   const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/admin/signup', user);
      alert('Registration successful!');
      navigate('/'); // Redirect to login
    } catch (error) {
      console.error('Registration failed:', error.response?.data || error.message);
      alert('Error: ' + (error.response?.data?.message || 'Something went wrong'));
    }
  };

    return <div>
        <h1>Register as Admin</h1>
        <form onSubmit={handleSubmit} className="space-y-4">

         <input
          type="email"
          name="email"
          placeholder="Email"
          value={user.email}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={user.password}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

            <input
          type="text"
          name="firstName"
          placeholder="firstname"
          value={user.firstName}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          name="lastName"
          placeholder="lastname"
          value={user.lastName}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Register 
        </button>
        </form>
    </div>
}