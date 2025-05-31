import { useNavigate } from 'react-router-dom';

export function AuthLanding() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm text-center">
        <h1 className="text-2xl font-bold mb-6">Welcome to Coursera Clone</h1>

        <button
          onClick={() => navigate('/user/login')}
          className="w-full bg-blue-600 text-white py-2 rounded mb-4 hover:bg-blue-700"
        >
          User Login
        </button>

        <button
          onClick={() => navigate('/admin/login')}
          className="w-full bg-green-600 text-white py-2 rounded mb-4 hover:bg-green-700"
        >
          Admin Login
        </button>
        <div className='flex space-x-2 w-full max-w-md mx-auto mt-4'>
        <button
          onClick={() => navigate('/register/user')}
          className="w-half bg-gray-600 text-white py-2 px-1 rounded hover:bg-gray-700"
        >
          Register user
        </button>

        <button
          onClick={() => navigate('/register/admin')}
          className="w-half bg-gray-600 text-white py-2 px-1 rounded hover:bg-gray-700"
        >
          Register admin
        </button>
        </div>
      </div>
    </div>
  );
}
