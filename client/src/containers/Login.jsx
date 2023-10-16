import React, { useEffect, useState } from 'react';
import { loginBg, logo } from '../asset';
import { LoginInput } from '../components';
import { FaEnvelope, FaLock, FaRegUser } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { buttonClick } from '../animations';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import { setUserDetails } from '../context/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { app } from '../config/firebase.config';
import { validateUserJWTToken } from '../api';
import {  alertDanger, alertNull, alertSuccess, alertWarning } from '../context/actions/alertActions';




const Login = () => {
  const [firstName, setFirstName] = useState('');
  const [surname, setSurname] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirm_password] = useState('');

  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
 
  useEffect(() => {
    if (user) {
      navigate('/', { replace: true });
    }
  }, [user,navigate]);

  const loginWithGoogle = async () => {
    await signInWithPopup(firebaseAuth, provider).then((userCred) => {
      firebaseAuth.onAuthStateChanged((Cred) => {
        if (Cred) {
          Cred.getIdToken().then((token) => {
            validateUserJWTToken(token).then((data) => {
              dispatch(setUserDetails(data));
            });
            navigate('/*', { replace: true });
          });
        }
      });
    });
  };

  const SignUpWithEmailPass = async () => {
    if ( firstName === '' || surname=== '' || userEmail === '' || password === '' || confirm_password === '') {
      dispatch(alertDanger('Please fill all input fields '));
      setTimeout(() => {
        dispatch(alertNull());
      }, 3000);
    } else {
      if (password === confirm_password) {
        setFirstName('')
        setSurname('')
        setUserEmail('');
        setPassword('');
        setConfirm_password('');
        await createUserWithEmailAndPassword(firebaseAuth,  userEmail, password)
          .then((userCred) => {
            firebaseAuth.onAuthStateChanged((Cred) => {
              if (Cred) {
                Cred.getIdToken().then((token) => {
                  validateUserJWTToken(token).then((data) => {
                    dispatch(setUserDetails(data));
                    dispatch(alertSuccess("Accounted creation successfull"))
                    setTimeout(() => {
                      dispatch(alertNull());
                    }, 3000);
                  });
                  navigate('/', { replace: true });
                });
              }
            });
          })
          .catch((error) => {
            dispatch(alertWarning("This email already exist, Please "));
            setTimeout(() => {
              dispatch(alertNull());
            }, 3000);
          });
        console.log('Equal');
      } else {
        dispatch(alertWarning(" password error"));
        setTimeout(() => {
          dispatch(alertNull());
        }, 3000);
      }
    }
  };

  const singInWithEmailPass = async () => {
    if (userEmail !== '' && password !== '') {
      await signInWithEmailAndPassword(firebaseAuth, userEmail, password)
        .then((userCred) => {
          firebaseAuth.onAuthStateChanged((Cred) => {
            if (Cred) {
              Cred.getIdToken().then((token) => {
                validateUserJWTToken(token).then((data) => {
                  dispatch(setUserDetails(data));
                  dispatch(alertSuccess("Login successful"));
                  setTimeout(() => {
                    dispatch(alertNull());
                  }, 3000);
                });
                navigate('/', { replace: true });
              });
            }
          });
        })
        
        .catch((err) => {
          dispatch(alertWarning(" Email or Password does not match"));
          setTimeout(() => {
            dispatch(alertNull());
          }, 3000);
        });
    } else {
      dispatch(alertWarning("Enter your email or password"));
      setTimeout(() => {
        dispatch(alertNull());
      }, 3000);
    }
  };
  

  return (
    <div className="w-screen h-screen  relative overflow-hidden flex">
       <div className="overflow-y-auto w-full h-full">
  {/* backgroud image */}
  <img src={loginBg} className="w-full h-full object-cover absolute top-0 left-0" alt="" />

  {/* content box */}
  <div className="flex flex-col items-center bg-blend-multiply w-[80%] md:w-508 min-h-screen z-10 backdrop-blur-md p-4 px-4 py-12 gap-3 ">

    {/* logo section */}
    <div className="flex items-center justify-start gap-4 w-full ">
      <img src={logo} className="w-6" alt="" />
      <p className="text-headingColor font-semibold  "> Digi.Books</p>
    </div>

    {/* Welcome text */}
    <p className="text-3xl font-semibold text-headingColor"> Welcome </p>
    <p className="text-xl text-textColor -mt-1">{isSignUp ? 'Sign Up ' : 'Sign In '}with the following </p>

    {/* input */}
    <div className="w-full flex flex-col items-center justify-center gap-6  px-4 md:px-12 py-4">
      {isSignUp && (
        <div className="w-full">
          <LoginInput
            placeholder="First Name"
            icon={<FaRegUser className="text-xl text-primary" />}
            inputState={firstName}
            inputStateFunc={setFirstName}
            type="text"
            isSignUp={isSignUp}
          />
        </div>
      )}
      {isSignUp && (
        <div className="w-full">
          <LoginInput
            placeholder="Surname"
            icon={<FaRegUser className="text-xl text-primary" />}
            inputState={surname}
            inputStateFunc={setSurname}
            type="text"
            isSignUp={isSignUp}
          />
        </div>
      )}
      <LoginInput
        placeholder="Enter your email"
        icon={<FaEnvelope className="text-xl text-primary" />}
        inputState={userEmail}
        inputStateFunc={setUserEmail}
        type="email"
        isSignUp={isSignUp}
      />

      {!isSignUp && (
        <LoginInput
          placeholder="Password "
          icon={<FaLock className="text-xl text-primary" />}
          inputState={password}
          inputStateFunc={setPassword}
          type="password"
          isSignUp={isSignUp}
        />
      )}

      {isSignUp && (
        <div className="w-full">
          <LoginInput
            placeholder="Password "
            icon={<FaLock className="text-xl text-primary" />}
            inputState={password}
            inputStateFunc={setPassword}
            type="password"
            isSignUp={isSignUp}
          />
        </div>
      )}

      {isSignUp && (
        <div className="w-full">
          <LoginInput
            placeholder="Confirm Password  "
            icon={<FaLock className="text-xl text-primary" />}
            inputState={confirm_password}
            inputStateFunc={setConfirm_password}
            type="password"
            isSignUp={isSignUp}
          />
        </div>
      )}

          {!isSignUp ? (
            <p>
              Doesn't have an account yet:{' '}
              <motion.button
                {...buttonClick}
                className="text-red-400 underline cursor-pointer bg-transparent"
                onClick={() => setIsSignUp(true)}
              >
                Create one{' '}
              </motion.button>
            </p>
          ) : (
            <p>
              Already have an existing Account:{' '}
              <motion.button
                {...buttonClick}
                className="text-red-400 underline cursor-pointer bg-transparent"
                onClick={() => setIsSignUp(false)}
              >
                Login
              </motion.button>
            </p>
          )}

          {/* button section  */}
          {isSignUp ? (
            <motion.button
              {...buttonClick}
              className="w-full px-4 py-2 rounded-md bg-red-400 cursor-pointer text-white text-xl capitalize hover:bg-red-500 transition-all duration-150"
              onClick={SignUpWithEmailPass}
            >
              Sign Up
            </motion.button>
          ) : (
            <motion.button
              {...buttonClick}
              onClick={singInWithEmailPass}
              className="w-full px-4 py-2 rounded-md bg-red-400 cursor-pointer text-white text-xl capitalize hover:bg-red-500 transition-all duration-150"
            >
              Sign In
            </motion.button>
          )}
        </div>

        <div className="flex items-center justify-between gap-16">
          <div className="w-24 h-[1px] rounded-md bg-blue-500"></div>
          <p className="text-blue-500">or </p>
          <div className="w-24 h-[1px] rounded-md bg-blue-500"></div>
        </div>

        <motion.div
          {...buttonClick}
          className="flex items-center justify-center px-20 py-2 bg-primary backdrop-blur-md cursor-pointer rounded-3xl gap-4 mb-80 "
          onClick={loginWithGoogle}
        >
          <FcGoogle className="text-3xl" />
          <p className="capitalize text-base text-headingColor">Sign in with Google</p>
        </motion.div>
      </div>
      </div>
    </div>
  );
};

export default Login;
