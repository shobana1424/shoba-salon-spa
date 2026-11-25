import {createContext,useContext,useEffect,useState,useCallback} from 'react';
import * as seed from '../data/seed';
import {createAppointment,cancelAppointment,fmt,inr,iso} from '../utils/appointments';
const Ctx=createContext();
export const useApp=()=>useContext(Ctx);
const load=(k,d)=>{try{const v=localStorage.getItem('shoba_'+k);return v?JSON.parse(v):d}catch{return d}};
function usePersist(k,d){
  const [v,s]=useState(()=>load(k,d));
  useEffect(()=>{try{localStorage.setItem('shoba_'+k,JSON.stringify(v))}catch{}},[k,v]);
  useEffect(()=>{const h=e=>{if(e.key==='shoba_'+k&&e.newValue)s(JSON.parse(e.newValue))};window.addEventListener('storage',h);return()=>window.removeEventListener('storage',h)},[k]);
  return [v,s];
}
export function AppProvider({children}){
  const services=seed.services;const setServices=()=>{}; // view-only: services are fixed in seed.js
  const categories=seed.categories;const setCategories=()=>{};
  const [offers,setOffers]=usePersist('offers',seed.offers);
  const [appointments,setAppointments]=usePersist('appointments',seed.appointments);
  const [users,setUsers]=usePersist('users',seed.users);
  const [notifications,setNotifications]=usePersist('notifications',seed.notifications);
  const [bills,setBills]=usePersist('bills',[]);
  const [session,setSession]=usePersist('session',null);
  const [toastMsg,setToast]=useState(null);
  const toast=useCallback(m=>{setToast(m);setTimeout(()=>setToast(null),3000)},[]);
  const notify=(type,msg)=>setNotifications(n=>[{id:'n'+Date.now()+Math.random(),type,msg,read:false,at:new Date().toISOString()},...n]);
  const today=iso(new Date());
  const liveOffers=offers.filter(o=>o.active&&o.validTo>=today);
  const book=data=>{ // used by Admin (Offline) and Client (Online)
    const r=createAppointment(appointments,data);
    setAppointments(r.list);
    notify(data.type==='Online'?'booking':'booking',`New ${data.type.toLowerCase()} booking ${r.appt.id} - ${data.customer.name}, ${r.appt.date} ${fmt(r.appt.start)}`);
    return r.appt;
  };
  const cancel=id=>{setAppointments(l=>cancelAppointment(l,id));notify('cancel',`Appointment ${id} was cancelled`)};
  const setStatus=(id,status)=>{setAppointments(l=>l.map(a=>a.id===id?{...a,status}:a));notify(status==='Confirmed'?'confirm':'booking',`Appointment ${id} marked ${status}`)};
  const setPayment=(id,payment)=>{setAppointments(l=>l.map(a=>a.id===id?{...a,payment}:a));notify('payment',`Payment for ${id} is now ${payment}`)};
  const login=(role,email,password)=>{
    const u=users.find(x=>x.role===role&&x.email.toLowerCase()===email.trim().toLowerCase()&&x.password===password);
    if(!u) return false; setSession({id:u.id,name:u.name,email:u.email,phone:u.phone,role:u.role}); return true;
  };
  const register=({name,email,phone,password})=>{
    if(users.some(u=>u.email.toLowerCase()===email.toLowerCase())) throw new Error('Email already registered');
    const u={id:'u'+Date.now(),name,email,phone,password,role:'client'};
    setUsers(l=>[...l,u]); setSession({id:u.id,name,email,phone,role:'client'});
  };
  const logout=()=>setSession(null);
  const value={services,setServices,categories,setCategories,offers,setOffers,liveOffers,appointments,book,cancel,setStatus,setPayment,
    users,notifications,setNotifications,bills,setBills,session,login,register,logout,toast,toastMsg,inr,today};
  return <Ctx.Provider value={value}>{children}{toastMsg&&<div className="fixed bottom-5 left-1/2 z-[100] -translate-x-1/2 rounded-full bg-charcoal px-5 py-2 text-sm text-white shadow-lg">{toastMsg}</div>}</Ctx.Provider>;
}
