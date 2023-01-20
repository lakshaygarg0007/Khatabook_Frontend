import {Link, useNavigate} from 'react-router-dom';
import { useState } from 'react';
import BarGraph from './Dashboard/dashboard';
import id from 'date-fns/esm/locale/id/index.js';

export default function Login(props) {
  const [email, set_email] = useState("");
  const [password, set_password] = useState("");
  const [response, set_response] = useState(null);
  const [error, set_error] = useState(null);
  let navigate = useNavigate();


  const login = (async () => {
    const data = {
        "email": email,
        "password": password
    };

    const options = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    }

    try {
        const response = await fetch('http://192.168.29.13:8000/login', options);
        if(response.status === 200) {
          const json_response = await response.json()
          sessionStorage.setItem('user_data', JSON.stringify({ name: json_response.name, id: json_response.id,  
            earning: json_response.earning, expense: json_response.expense}));
          navigate('/', { state: { id: json_response.id, name : json_response.name, earning: json_response.earning, 
            expense: json_response.expense } })
            set_error('')
        } else {
          set_email('');
          set_password('');
          set_error('Incorrect username or password.');
        }
    } catch (err) {
        set_error(err);
    }
});

  return (
    <>
      <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
        <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
          <h1 className="title-font font-medium text-3xl text-gray-900">KhataBook</h1>
          <p className="leading-relaxed mt-4">Manage All Your Expenese Here</p>
        </div>
        <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
          <h2 className="text-gray-900 text-lg font-medium title-font mb-5">Login</h2>
          <div className="relative mb-4">
            <label for="email" className="leading-7 text-sm text-gray-600">Email</label>
            <input type="email" id="email" value={email} name="email" className="w-full bg-white rounded border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" onChange={(e) => set_email(e.target.value)}></input>
          </div>
          <div className="relative mb-4">
            <label for="email" className="leading-7 text-sm text-gray-600">Password</label>
            <input type="password" id="password" value={password} name="password" className="w-full bg-white rounded border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" onChange={(e) => set_password(e.target.value)}></input>
          </div>
          <button className="text-white bg-red-500 border-0 py-2 px-8 focus:outline-none hover:bg-red-600 rounded text-lg" onClick={login}>Signin</button>
          <p className="text-xs text-gray-500 mt-3">Welcome Back.</p>

          <div className="text-grey-dark mt-5 px-8">
            New to KhataBook?
            <Link className="no-underline border-b border-blue text-black px-2" to="/signup">
              Register Here
            </Link>.
          </div>
          { error && 
            (
              <div class="text-red-500  mt-4 px-12">{error}</div>
            )
          }
        </div>
      </div>
    </>
  )
}