import React, { useEffect, useState } from 'react';
import ErrorAlert from '../Alerts/ErrorAlert';
import { Link } from 'react-router-dom';
import Loader from '../Loader/Loader';
import { isValidPassword } from '../../helpers/isValidPassword';

const API_URL = process.env.REACT_APP_API_URL;

export default function Registration() {
  // const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [loading, setLoading] = useState(false);
  const [errorEmail, setErrorEmail] = useState(true);
  const [errorName, setErrorName] = useState(true);
  const [errorPassword, setErrorPassword] = useState(true);
  const [errorAlert, setErrorAlert] = useState(false);
  const [disableRegButton, setDisableRegButton] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setErrorEmail(
      !/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
        email,
      ),
    );
    setErrorPassword(!isValidPassword(password));
    setErrorName(name.length < 4);
  }, [email, name, password]);

  useEffect(() => {
    if (!errorEmail && !errorPassword && !errorName) {
      setDisableRegButton(false);
    } else {
      setDisableRegButton(true);
    }
  }, [errorEmail, errorName, errorPassword]);

  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const onChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  // const onClickBack = () => {
  //   return navigate(-1);
  // };

  const onClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const registration = async () => {
    try {
      setLoading(true);
      setErrorAlert(false);

      const response = await fetch(`${API_URL}/auth/registration`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({ email, name, password }),
      });

      if (response.status === 201) {
        setLoading(false);
        window.location.href = '/';
        return;
      } else {
        setErrorMessage('User already exists');
        setErrorAlert(true);
        return;
      }
    } catch (e) {
      setErrorMessage('Server is not available!');
      setErrorAlert(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-screen max-w-4xl m-auto">
        {errorAlert ? <ErrorAlert message={errorMessage} /> : false}

        {/*{loading ? <Loader /> : false}*/}
        <Loader loading={loading} />

        <div className="bg-gray-800 text-gray-500 shadow-xl sm:w-full md:w-2/4 overflow-hidden z-0">
          <div className="md:flex w-full">
            <div className="w-full py-10 px-5 md:px-10">
              <div className="text-center mb-10">
                <h1 className="font-bold text-3xl text-gray-300">REGISTER</h1>
                <p className="text-gray-300">
                  Enter your information to register
                </p>
              </div>

              {/*email*/}
              <div className="flex -mx-3">
                <div className="w-full px-5 mb-5">
                  <label
                    htmlFor=""
                    className="text-xs font-semibold px-1 text-gray-300"
                  >
                    Email
                  </label>
                  <div className="flex">
                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 26 26"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={onChangeEmail}
                      className={
                        errorEmail
                          ? 'w-full -ml-10 pl-10 pr-3 py-2 border-2 border-gray-400 outline-none focus:border-red-500 bg-gray-800 text-gray-300'
                          : 'w-full -ml-10 pl-10 pr-3 py-2 border-2 border-gray-400 outline-none focus:border-indigo-500 bg-gray-800 text-gray-300'
                      }
                      placeholder="Email"
                    />
                  </div>
                  {errorEmail ? (
                    <span className="flex items-center font-light tracking-wide text-red-500 text-xs mt-1 ml-1">
                      Please, enter correct email address
                    </span>
                  ) : (
                    ''
                  )}
                </div>
              </div>

              {/*name*/}
              <div>
                <div className="flex -mx-3">
                  <div className="w-full px-5 mb-5">
                    <label
                      htmlFor=""
                      className="text-xs font-semibold px-1 text-gray-300"
                    >
                      Name
                    </label>
                    <div className="flex">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 26 26"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <input
                        type="name"
                        value={name}
                        onChange={onChangeName}
                        className={
                          errorName
                            ? 'w-full -ml-10 pl-10 pr-3 py-2 border-2 border-gray-400 outline-none focus:border-red-500 bg-gray-800 text-gray-300'
                            : 'w-full -ml-10 pl-10 pr-3 py-2 border-2 border-gray-400 outline-none focus:border-indigo-500 bg-gray-800 text-gray-300'
                        }
                        placeholder="Name"
                      />
                    </div>
                    {errorName ? (
                      <span className="flex items-center font-light tracking-wide text-red-500 text-xs mt-1 ml-1">
                        Length must be bigger than 4 chapters
                      </span>
                    ) : (
                      ''
                    )}
                  </div>
                </div>

                {/*password*/}
                <div className="flex -mx-3">
                  <div className="w-full px-5 mb-3">
                    <label
                      htmlFor=""
                      className="text-xs font-semibold px-1 text-gray-300"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none absolute top-2.5 flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 26 26"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                          />
                        </svg>
                      </div>
                      <input
                        type={!showPassword ? 'password' : 'text'}
                        value={password}
                        onChange={onChangePassword}
                        className={
                          errorPassword
                            ? 'w-full pl-10 pr-11 py-2 border-2 border-gray-400 outline-none focus:border-red-500 bg-gray-800 text-gray-300'
                            : 'w-full pl-10 pr-11 py-2 border-2 border-gray-400 outline-none focus:border-indigo-500 bg-gray-800 text-gray-300'
                        }
                        placeholder="******"
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                        {!showPassword ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-gray-500 hover:text-gray-700"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            onClick={onClickShowPassword}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-gray-500 hover:text-gray-700"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            onClick={onClickShowPassword}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                            />
                          </svg>
                        )}
                      </div>
                    </div>
                    {errorPassword ? (
                      <span className="flex items-center font-light tracking-wide text-red-500 text-xs mt-1 ml-1 pb-4">
                        Must be use 1 big latter, 1 small letter and some
                        numbers. Minimal length 8.
                      </span>
                    ) : (
                      <div className="w-full py-4" />
                    )}
                  </div>
                </div>
                <div className="flex -mx-3">
                  <div className="w-full px-5 mb-5">
                    <button
                      onClick={registration}
                      className={
                        disableRegButton
                          ? 'block w-full max-w-xs mx-auto bg-gray-500 hover:bg-gray-600 text-white px-3 py-3 font-semibold pointer-events-none'
                          : 'block w-full max-w-xs mx-auto bg-indigo-600 hover:bg-indigo-700 focus:bg-indigo-700 text-white px-3 py-3 font-semibold'
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-10 m-auto"
                        fill="none"
                        viewBox="0 0 21 21"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </button>

                    <Link to={'/'}>
                      <button
                        // onClick={onClickBack}
                        className="block w-full max-w-xs mx-auto mt-2 bg-indigo-600 hover:bg-indigo-700 focus:bg-indigo-700 text-white px-3 py-3 font-semibold shadow-xl"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-10 m-auto"
                          fill="none"
                          viewBox="0 0 21 21"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 16l-4-4m0 0l4-4m-4 4h18"
                          />
                        </svg>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
