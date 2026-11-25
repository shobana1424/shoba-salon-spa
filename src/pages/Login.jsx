import {useState} from 'react';import {Link,useLocation,useNavigate} from 'react-router-dom';
import {img} from '../assets/photos';import logo from '../assets/images/logo.png';import {useApp} from '../context/AppContext';import {Field} from '../components/common/ui';
export default function Login({role}){
  const {login,register}=useApp();const nv=useNavigate();const loc=useLocation();
  const [reg,setReg]=useState(false);const [f,setF]=useState({name:'',email:'',phone:'',password:''});const [e,setE]=useState({});
  const admin=role==='admin';const u=k=>({value:f[k],onChange:ev=>setF({...f,[k]:ev.target.value}),className:'input'});
  const go=()=>nv(loc.state?.from||(admin?'/admin':'/client'),{replace:true});
  const submit=ev=>{ev.preventDefault();const x={};
    if(reg&&f.name.trim().length<2)x.name='Enter your name';if(!/^\S+@\S+\.\S+$/.test(f.email))x.email='Enter a valid email';
    if(reg&&!/^\d{10}$/.test(f.phone))x.phone='Enter a 10-digit phone number';if(f.password.length<6)x.password='Minimum 6 characters';
    setE(x);if(Object.keys(x).length)return;
    if(reg){try{register(f);go()}catch(err){setE({email:err.message})}return}
    if(login(role,f.email,f.password))go();else setE({password:'Invalid email or password'});};
  return <div className="grid min-h-screen bg-cream md:grid-cols-2"><div className="relative hidden md:block"><img src={img.bridal} alt="" style={{objectPosition:'65% center'}} className="absolute inset-0 h-full w-full object-cover"/><div className="absolute inset-0 flex items-end bg-gradient-to-t from-charcoal/80 to-transparent p-10 text-white"><p className="serif text-3xl">Beauty, Elegance & Confidence</p></div></div><div className="flex items-center justify-center p-4"><form onSubmit={submit} className="card w-full max-w-md space-y-4">
    <img src={logo} alt="" className="mx-auto h-20 w-20 object-contain"/><Link to="/" className="serif block text-center text-2xl">Shoba <span className="text-gold">Salon & Spa</span></Link>
    <h1 className="text-center text-xl">{admin?'Admin Login':reg?'Create Client Account':'Client Login'}</h1>
    {reg&&<><Field label="Full name" error={e.name}><input {...u('name')}/></Field><Field label="Phone" error={e.phone}><input {...u('phone')}/></Field></>}
    <Field label="Email" error={e.email}><input {...u('email')}/></Field>
    <Field label="Password" error={e.password}><input type="password" {...u('password')}/></Field>
    <button className="btn-gold w-full">{reg?'Register':'Login'}</button>
    <div className="rounded-lg bg-beige/50 p-3 text-xs">Demo credentials: <b>{admin?'admin@shoba.demo / admin123':'client@shoba.demo / client123'}</b></div>
    {!admin&&<button type="button" className="w-full text-sm text-gold" onClick={()=>{setReg(!reg);setE({})}}>{reg?'Have an account? Login':'New here? Register'}</button>}
    <Link to={admin?'/login/client':'/login/admin'} className="block text-center text-xs underline">{admin?'Client login':'Admin login'}</Link></form></div></div>;
}
