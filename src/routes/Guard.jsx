import {Navigate,useLocation} from 'react-router-dom';import {useApp} from '../context/AppContext';
export default function Guard({role,children}){
  const {session}=useApp();const loc=useLocation();
  if(!session) return <Navigate to={`/login/${role}`} state={{from:loc.pathname+loc.search}} replace/>;
  if(session.role!==role) return <Navigate to={session.role==='admin'?'/admin':'/client'} replace/>;
  return children;
}
