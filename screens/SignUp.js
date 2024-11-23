import React from 'react';
import SharedForm from '../components/AuthForm/SharedForm';

const SignUp = ({navigation}) => {
  const handleSignUp = (form) => {
    console.log('Sign Up Form Data:', form);
  };

  return <SharedForm isSignUp={true} onSubmit={handleSignUp} navigation={navigation} />; // Pass navigation prop
};

export default SignUp;
