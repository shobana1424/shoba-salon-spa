import {useEffect,useState} from 'react';import {AnimatePresence} from 'framer-motion';import Intro from './components/common/Intro';import {HashRouter,Routes,Route,Navigate,useLocation} from 'react-router-dom';
import {AppProvider} from './context/AppContext';import {PublicLayout} from './components/layout/Layout';
import {Home,About,Services,Gallery,Offers,Contact} from './pages/public/Public';
import Login from './pages/Login';import Guard from './routes/Guard';import Admin from './pages/admin/Admin';import Client from './pages/client/Client';
function ScrollTop(){const {pathname}=useLocation();useEffect(()=>{window.scrollTo({top:0,left:0,behavior:'instant'})},[pathname]);return null}
export default function App(){const [intro,setIntro]=useState(true);return <AppProvider><AnimatePresence>{intro&&<Intro key="intro" onDone={()=>setIntro(false)}/>}</AnimatePresence><HashRouter><ScrollTop/><Routes>
  <Route element={<PublicLayout/>}><Route index element={<Home/>}/><Route path="about" element={<About/>}/><Route path="services" element={<Services/>}/><Route path="gallery" element={<Gallery/>}/><Route path="offers" element={<Offers/>}/><Route path="contact" element={<Contact/>}/></Route>
  <Route path="/login/admin" element={<Login role="admin"/>}/><Route path="/login/client" element={<Login role="client"/>}/>
  <Route path="/admin/*" element={<Guard role="admin"><Admin/></Guard>}/><Route path="/client/*" element={<Guard role="client"><Client/></Guard>}/>
  <Route path="*" element={<Navigate to="/" replace/>}/></Routes></HashRouter></AppProvider>}
