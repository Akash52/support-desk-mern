import React from 'react';
import { FaUser } from 'react-icons/fa';
import { toast } from 'react-toastify';

function Register() {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  console.log(formData);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      toast.error('Passwords do not match');
    } else {
      toast.success('Registered successfully');
    }
  };

  const { name, email, password, password2 } = formData;
  return (
    <>
      <section className='heading'>
        <h1>
          <FaUser />
          Register
        </h1>
        <p>Please create an account</p>
      </section>
      <section className='form'>
        <form autoComplete='false' onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              type='text'
              name='name'
              id='name'
              placeholder='Name'
              value={name}
              className='form-control'
              onChange={onChange}
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='email'
              name='email'
              id='email'
              placeholder='Email'
              className='form-control'
              value={email}
              onChange={onChange}
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              name='password'
              placeholder='Password'
              id='password'
              className='form-control'
              value={password}
              onChange={onChange}
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              name='password2'
              id='password2'
              placeholder='Confirm Password'
              className='form-control'
              value={password2}
              onChange={onChange}
              required
            />
          </div>
          <div className='form-group'>
            <button className='btn btn btn-block'>Register</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Register;
