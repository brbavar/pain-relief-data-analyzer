import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToken } from '../lib/useToken';

import EyeIconBox from '../components/EyeIconBox';
import { eyeOpen, togglePasswordVisibility } from '../lib/password-visibility';

import onsubmitHandler from '../lib/onsubmitHandler';

const Register = () => {
  useEffect(() => {
    document.title = 'Create an account | JCBenny';
  });

  const [svgPath, setSVGPath] = useState(eyeOpen);
  const [svgCX, setSVGcx] = useState('56.5');
  const [lineWidth, setLineWidth] = useState('0');

  const [passVis, setPassVis] = useState('password');

  const eyeClickHandler = () =>
    togglePasswordVisibility(
      [passVis, setPassVis],
      [svgPath, setSVGPath],
      [svgCX, setSVGcx],
      [lineWidth, setLineWidth]
    );

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  let [token, setToken] = useToken();

  const navigate = useNavigate();

  const onfulfilled = async (response) => {
    ({ token } = await response.json());
    setToken(token);

    if (response.status === 400) {
      return;
    } else {
      const card = document.querySelector('#register > div.card');
      card.querySelectorAll('*').forEach((elem) => elem.remove());
      const h2 = document.createElement('h2');
      card.appendChild(h2);
      h2.textContent = 'Your account was successfully created!';
      setTimeout(() => navigate('/please-verify'), 3000);
    }
  };

  return (
    <body id='register'>
      <div className='card'>
        <h3>Create an account</h3>
        <form
          onSubmit={(e) =>
            onsubmitHandler(e, null, 'POST', '/register/', onfulfilled)
          }
        >
          <div className='field'>
            <label for='email'>Email</label>
            <input
              id='email'
              name='Email'
              type='email'
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='name-section'>
            <div className='field'>
              <label for='first-name'>First name</label>
              <input id='first-name' name='First name' type='text' />
            </div>
            <div className='field'>
              <label for='last-name'>Last name</label>
              <input id='last-name' name='Last name' type='text' />
            </div>
          </div>
          <div className='password-section'>
            <div className='field'>
              <label for='password'>Password</label>
              <div className='password-subfield'>
                <input
                  style={{ width: '100%' }}
                  id='password'
                  name='Password'
                  type={passVis}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <EyeIconBox
                  eyeClickHandler={eyeClickHandler}
                  svgPath={svgPath}
                  svgCX={svgCX}
                  lineWidth={lineWidth}
                />
              </div>
            </div>
            <div className='field'>
              <label for='confirm'>Confirm password</label>
              <div className='password-subfield'>
                <input
                  style={{ width: '100%' }}
                  id='confirm'
                  name='Confirm password'
                  rdtype={passVis}
                />
                <EyeIconBox
                  eyeClickHandler={eyeClickHandler}
                  svgPath={svgPath}
                  svgCX={svgCX}
                  lineWidth={lineWidth}
                />
              </div>
            </div>
          </div>
          <div className='field'>
            <input
              className='submit'
              type='submit'
              name='Create account'
              value='Create account'
              disabled={!(email && password)}
            />
          </div>
          <p style={{ fontSize: '10pt' }}>
            Already have an account? <a href='login'>Sign in.</a>
          </p>
        </form>
      </div>
    </body>
  );
};

export default Register;
