import {useState,useEffect} from 'react';import logo from '../../assets/images/logo.png';import {Link,NavLink,Outlet,useNavigate} from 'react-router-dom';
import {motion,useScroll,useSpring} from 'framer-motion';
import {Menu,X,Bell,LogOut,MapPin,Phone,Mail,Clock} from 'lucide-react';
import {useApp} from '../../context/AppContext';import {site} from '../../data/site';
const nav=[['/','Home'],['/about','About'],['/services','Services'],['/gallery','Gallery'],['/offers','Offers'],['/contact','Contact']];
export function Navbar(){
  const [o,setO]=useState(false);const {session,logout}=useApp();const nv=useNavigate();
  const dash=session?(session.role==='admin'?'/admin':'/client'):null;
  const cls=({isActive})=>`text-sm ${isActive?'text-gold':'hover:text-gold'}`;
  return <header className="sticky top-0 z-40 border-b border-beige bg-ivory/95 backdrop-blur">
    <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2.5">
      <Link to="/" className="serif flex items-center gap-2 text-xl font-semibold"><img src={logo} alt="" className="h-10 w-10 object-contain"/><span>Shoba <span className="text-gold">Salon & Spa</span></span></Link>
      <nav className="hidden items-center gap-6 lg:flex">{nav.map(([p,l])=><NavLink key={p} to={p} end={p==='/'} className={cls}>{l}</NavLink>)}</nav>
      <div className="hidden items-center gap-2 lg:flex">
        {dash?<><Link to={dash} className="btn-out">Dashboard</Link><button className="btn-dark" onClick={()=>{logout();nv('/')}}>Logout</button></>:<><Link to="/login/client" className="btn-out">Client Login</Link><Link to="/login/admin" className="text-xs underline">Admin</Link></>}
        <Link to="/client/book" className="btn-gold">Book Appointment</Link></div>
      <button className="lg:hidden" onClick={()=>setO(!o)} aria-label="Menu">{o?<X/>:<Menu/>}</button></div>
    {o&&<div className="space-y-3 border-t border-beige px-4 py-4 lg:hidden" onClick={()=>setO(false)}>
      {nav.map(([p,l])=><NavLink key={p} to={p} end={p==='/'} className={cls+''}>{()=>l}</NavLink>).map((x,i)=><div key={i}>{x}</div>)}
      <Link to="/client/book" className="btn-gold w-full">Book Appointment</Link>
      {dash?<><Link to={dash} className="btn-out w-full">Dashboard</Link><button className="btn-dark w-full" onClick={()=>{logout();nv('/')}}>Logout</button></>:<><Link to="/login/client" className="btn-out w-full">Client Login</Link><Link to="/login/admin" className="block text-center text-xs underline">Admin Login</Link></>}</div>}
  </header>;
}
export const Footer=()=>(<footer className="bg-charcoal text-white"><div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3">
  <div><img src={logo} alt="Shoba Salon & Spa logo" className="mb-3 h-16 w-16 object-contain"/><h3 className="serif mb-2 text-xl">Shoba <span className="text-gold">Salon & Spa</span></h3><p className="text-sm text-white/70">{site.tagline}</p></div>
  <div className="space-y-2 text-sm text-white/80"><p className="flex gap-2"><MapPin size={16}/>{site.address}</p><p className="flex gap-2"><Phone size={16}/>{site.phone}</p><p className="flex gap-2"><Mail size={16}/>{site.email}</p><p className="flex gap-2"><Clock size={16}/>{site.hours}</p></div>
  <div className="space-y-1 text-sm">{nav.map(([p,l])=><Link key={p} to={p} className="block text-white/70 hover:text-gold">{l}</Link>)}</div></div>
  <p className="border-t border-white/10 py-4 text-center text-xs text-white/50">© {new Date().getFullYear()} Shoba Salon & Spa · Frontend demo (mock data in localStorage)</p></footer>);
function Progress(){const {scrollYProgress}=useScroll();const x=useSpring(scrollYProgress,{stiffness:120,damping:25});return <motion.div style={{scaleX:x}} className="fixed left-0 top-0 z-[60] h-1 w-full origin-left bg-gold"/>}
export const PublicLayout=()=><><Progress/><Navbar/><main><Outlet/></main><Footer/></>;
export function NotificationBell(){
  const {notifications,setNotifications}=useApp();const [o,setO]=useState(false);const un=notifications.filter(n=>!n.read).length;
  return <div className="relative"><button onClick={()=>setO(!o)} className="relative rounded-full p-2 hover:bg-beige" aria-label="Notifications"><Bell size={20}/>{un>0&&<span className="absolute -right-0.5 -top-0.5 rounded-full bg-red-500 px-1.5 text-[10px] text-white">{un}</span>}</button>
    {o&&<div className="absolute right-0 z-50 mt-2 w-80 max-w-[85vw] rounded-xl border border-beige bg-white p-3 shadow-xl">
      <div className="mb-2 flex justify-between text-sm"><b>Notifications</b><button className="text-gold" onClick={()=>setNotifications(l=>l.map(n=>({...n,read:true})))}>Mark all read</button></div>
      <div className="max-h-72 space-y-1 overflow-y-auto">{notifications.length===0&&<p className="p-3 text-sm text-charcoal/50">No notifications</p>}
      {notifications.slice(0,30).map(n=><button key={n.id} onClick={()=>setNotifications(l=>l.map(x=>x.id===n.id?{...x,read:true}:x))} className={`block w-full rounded-lg p-2 text-left text-xs ${n.read?'':'bg-gold/10 font-medium'}`}>{n.msg}<div className="text-[10px] text-charcoal/40">{new Date(n.at).toLocaleString()}</div></button>)}</div></div>}</div>;
}
export function DashShell({title,links,bell,children}){
  const [o,setO]=useState(false);const {session,logout}=useApp();const nv=useNavigate();useEffect(()=>{document.body.style.overflow=o?'hidden':'';return()=>{document.body.style.overflow=''}},[o]);
  const side=<div className="flex h-full flex-col bg-charcoal p-4 text-white"><Link to="/" className="serif mb-6 flex items-center gap-2 text-lg"><img src={logo} alt="" className="h-8 w-8 object-contain"/>Shoba <span className="text-gold">{title}</span></Link>
    <nav className="flex-1 space-y-1 overflow-y-auto">{links.map(([p,l,I])=><NavLink key={p} to={p} end={p===links[0][0]} onClick={()=>setO(false)} className={({isActive})=>`flex items-center gap-3 rounded-lg px-3 py-2 text-sm ${isActive?'bg-gold text-white':'text-white/70 hover:bg-white/10'}`}><I size={17}/>{l}</NavLink>)}</nav>
    <button className="flex items-center gap-2 px-3 py-2 text-sm text-white/70 hover:text-white" onClick={()=>{logout();nv('/')}}><LogOut size={17}/>Logout</button></div>;
  return <div className="min-h-screen lg:pl-60"><aside className="fixed inset-y-0 left-0 hidden w-60 lg:block">{side}</aside>
    {o&&<div className="fixed inset-0 z-50 flex lg:hidden"><div className="w-60">{side}</div><div className="flex-1 bg-black/50" onClick={()=>setO(false)}/></div>}
    <div className="sticky top-0 z-30 flex items-center justify-between border-b border-beige bg-ivory px-4 py-3"><button className="lg:hidden" onClick={()=>setO(true)} aria-label="Menu"><Menu/></button><span className="text-sm text-charcoal/60">Signed in as {session?.name}</span>{bell?<NotificationBell/>:<span/>}</div>
    <div className="p-4 md:p-6">{children}</div></div>;
}
