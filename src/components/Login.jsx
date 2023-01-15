import {Link} from 'react-router-dom'
export default function Login(props) {
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
            <input type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"></input>
          </div>
          <div className="relative mb-4">
            <label for="email" className="leading-7 text-sm text-gray-600">Password</label>
            <input type="password" id="password" name="password" className="w-full bg-white rounded border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"></input>
          </div>
          <button className="text-white bg-red-500 border-0 py-2 px-8 focus:outline-none hover:bg-red-600 rounded text-lg">Signin</button>
          <p className="text-xs text-gray-500 mt-3">Literally you probably haven't heard of them jean shorts.</p>

          <div className="text-grey-dark mt-6 px-8">
            New to KhataBook?
            <Link className="no-underline border-b border-blue text-black px-2" to="/signup">
              Register Here
            </Link>.
          </div>
        </div>
      </div>
    </>
  )
}