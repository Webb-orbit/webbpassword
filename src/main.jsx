import ReactDOM from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { Store } from './store/store.js'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Signupcompo from './compos/Signupcompo.jsx'
import Authlayout from './compos/Authlayout.jsx'
import Logincompo from './compos/Logincompo.jsx'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import Pdfpriview from './compos/Pdfpriview.jsx';
import Trying from './compos/Trying.jsx'
import Profile from './compos/Profile.jsx'
import Phonelogin from './compos/Phonelogin.jsx'
import Varify from './compos/Varify.jsx'
import Inditodo2 from './compos/Inditodo2.jsx'
import Profilepage from './pages/Profilepage.jsx'
import Profpassword from './compos/Profpassword.jsx'
import Dangerzone from './compos/Dangerzone.jsx'
import SpeechTheTodos from './pages/SpeechTheTodos.jsx'
import Blankspeech from './compos/text-speech/Blankspeech.jsx'
import Inditodopage from './pages/Inditodopage.jsx'
import Allshare from './compos/Allshare.jsx'
import Profshares from './compos/Profshares.jsx'
import Profabout from './compos/Profabout.jsx'
import Varifyemail from './compos/Varifyemail.jsx'
import Failcompo from './compos/Failcompo.jsx'
import Newinditodo from './compos/indetocopo/Newinditodo.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={Store}>
    <BrowserRouter>
    <Routes>
      <Route  path='/' element={<App/>}>
      <Route index path='/' element={ <Home/>}/>
      <Route path='/pdf/:pdfid' element={<Authlayout authencation={true} child={<Pdfpriview/>}/>}/>

      <Route  path='/:userid/todo/:slug' element={<Authlayout authencation={true} child={<Inditodopage/>}/>}>
        <Route  path='/:userid/todo/:slug' element={<Inditodo2/>}/>
      </Route>
        <Route path='/workspace/:userid/:slug' element={<Newinditodo/>} />
        <Route  path='/newtodo' element={<Newinditodo/>}/>

      <Route path='/account' element={<Authlayout authencation={true} child={<Profilepage/>}/>} >
        <Route path='/account' index element={<Authlayout authencation={true} child={<Profile/>}/>}/>
        <Route path='/account/password' element={<Authlayout authencation={true} child={<Profpassword/>}/>}/>
        <Route path='/account/Dangerzone' element={<Authlayout authencation={true} child={<Dangerzone/>}/>}/>
        <Route path='/account/about-us' element={<Authlayout authencation={true} child={<Profabout/>}/>}/>
        <Route path='/account/allshares' element={<Authlayout authencation={true} child={<Profshares/>}/>}/>
      </Route>

      <Route path='/varify' element={<Varify/>}/>
      <Route path='/varify-email' element={<Varifyemail/>}/>
      <Route path='/signup' element={<Authlayout authencation={false} child={<Signupcompo/>}/>}/>
      <Route path='/phonelogin' element={<Authlayout authencation={false} child={<Phonelogin/>}/>}/>
      <Route path='/test' element={<Trying/>}/>
      <Route path='/login' element={<Authlayout authencation={false} child={<Logincompo/>}/>}/>
      </Route>
      
      <Route path='/:userid/speech/:todoids' element={<Authlayout authencation={true} child={<SpeechTheTodos/>}/>}/>
      <Route path='/blank' element={<Authlayout authencation={true} child={<Blankspeech/>}/>}/>
      
      <Route path='/shared/:shareid' element={<Allshare/>} />
      <Route path='/error' element={<Failcompo/>} />

    </Routes>
    </BrowserRouter>
    </Provider>
)
