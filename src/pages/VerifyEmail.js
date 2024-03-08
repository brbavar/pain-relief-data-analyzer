import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const VerifyEmail = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/');
    }, 10000);
  }, [navigate]);

  return (
    <body id='verify-email'>
      <div>
        <h1>Thanks for signing up!</h1>
        <p>
          We just sent you a verification email. You must respond to that email
          to verify your email address, at which point you can begin reporting
          your pain relief results to Doloria.
        </p>
      </div>
    </body>
  );
};
