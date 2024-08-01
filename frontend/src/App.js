import React, { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Container } from '@chakra-ui/react'
import UserPage from './Pages/UserPage/UserPage'
import PostPage from './Pages/PostPage/PostPage'
import Header from './Components/Header/Header'
import { Toaster } from 'react-hot-toast';
import HomePage from './Pages/HomePage/HomePage'
import Auth from './Pages/Auth/Auth'
import { useAuthContext } from './Context/AuthContext'
import Logout from './Components/Logout/Logout'
import UpdateProfile from './Pages/UpdateProfile/UpdateProfile'
import CreatePost from './Components/CreatePost/CreatePost'
import ChatPage from './Pages/ChatPage/ChatPage'
import FreezAccount from './Pages/FreezAccount/FreezAccount'

const App = () => {
  const [authForm, setAuthForm] = useState("Login")
  const { authUser } = useAuthContext();
  return (
    <BrowserRouter>
      <Container maxW="620px">
        <Toaster position="bottom-center" />
        <Header authForm={authForm} setAuthForm={setAuthForm}/>
        <Routes>
          <Route path='/' element={authUser ? <HomePage /> : <Navigate to='/auth' />} />
          <Route path='/auth' element={!authUser ? <Auth authForm={authForm} setAuthForm={setAuthForm} /> : <Navigate to='/' />} />
          <Route path='/update' element={authUser ? <UpdateProfile /> : <Navigate to='/' />} />
          <Route path='/:username' element={authUser
            ? (
              <>
                <CreatePost />
                <UserPage />
              </>
            ) : (<UserPage />)} />
          <Route path='/:username/post/:pid' element={<PostPage />} />
          <Route path='/chat' element={authUser ? <ChatPage /> : <Navigate to='/auth' />} />
          <Route path='/setting' element={authUser ? <FreezAccount /> : <Navigate to='/auth' />} />
        </Routes>
      </Container>
      {authUser && <Logout />}
    </BrowserRouter>
  )
}

export default App