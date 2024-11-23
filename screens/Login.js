import React from 'react';
import SharedForm from '../components/AuthForm/SharedForm';

const Login = ({navigation}) => {
    const handleLogin = (form) => {
      console.log('Login Form Data:', form);
    };
  
    return <SharedForm isSignUp={false} onSubmit={handleLogin} navigation={navigation} />; // Pass navigation prop
  };

export default Login;
