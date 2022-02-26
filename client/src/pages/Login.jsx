import React from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';

function Login() {
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
  });

  console.log(formData);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {};

  const { email, password } = formData;
  return (
    <>
      <section className='heading'>
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Please login to get support</p>
      </section>
      <section className='form'>
        <form autoComplete='false' onSubmit={onSubmit}>
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
            <button className='btn btn btn-block'>Register</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Login;
