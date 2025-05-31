import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Registeruser,Registeradmin } from './component/register'
import {AuthLanding} from './component/AuthLanding'
import {BrowserRouter ,Route,Routes} from 'react-router-dom'
import { Loginuser,Loginadmin } from './component/Login'
import {CreateCourse,AdminCourseManager,EditCourse} from './component/create-course'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
     <Routes>
       <Route path="/" element={<AuthLanding />} />
       <Route path="/user/login" element={<Loginuser />} />
       <Route path="/admin/login" element={<Loginadmin />} />
       <Route path="/register/user" element={<Registeruser />} />
       <Route path="/register/admin" element={<Registeradmin />} />
       <Route path="/create/course" element={<CreateCourse />} />
       <Route path="/view/courses" element={<AdminCourseManager />} />
       <Route path="/edit/course/:id" element={<EditCourse />} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
