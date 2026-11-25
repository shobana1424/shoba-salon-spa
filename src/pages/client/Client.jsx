import {useState} from 'react';import {Routes,Route,Link,useSearchParams} from 'react-router-dom';
import {LayoutDashboard,CalendarPlus,History,CalendarCheck,CheckCircle2,Wallet,ListChecks} from 'lucide-react';
import {DashShell} from '../../components/layout/Layout';import {useApp} from '../../context/AppContext';
import ServiceCard from '../../components/cards/ServiceCard';import OfferSlider from '../../components/cards/OfferSlider';import SlotPicker from '../../components/forms/SlotPicker';
import {Modal,Confirm,Field,Stat,Badge,Table,Empty} from '../../components/common/ui';
import {calculateServiceDuration,calculateTotalPrice,inr,fmt,iso,toMin} from '../../utils/appointments';
const links=[['/client','Overview',LayoutDashboard],['/client/book','Book Appointment',CalendarPlus],['/client/history','Booking History',History]];
const mine=(a,s)=>a.filter(x=>x.userId===s.id||(s.email&&x.customer.email===s.email));
const isFuture=a=>new Date(`${a.date}T${a.start}`)>new Date();
function Overview(){
  const {appointments,session}=useApp();const m=mine(appointments,session);
  const up=m.filter(a=>['Pending','Confirmed'].includes(a.status)&&isFuture(a)).sort((a,b)=>(a.date+a.start).localeCompare(b.date+b.start));
  const prev=m.filter(a=>a.status==='Completed').slice(0,3);
  return <div className="space-y-6"><div><h1 className="text-2xl">Welcome, {session.name}</h1><p className="text-sm text-charcoal/60">Book your next treatment in a few taps.</p></div>
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"><Stat icon={ListChecks} label="Total bookings" value={m.length}/><Stat icon={CalendarCheck} label="Upcoming" value={up.length}/><Stat icon={CheckCircle2} label="Completed" value={m.filter(a=>a.status==='Completed').length}/><Stat icon={Wallet} label="Total spent" value={inr(m.filter(a=>a.status==='Completed').reduce((s,a)=>s+a.total,0))}/></div>
    <div className="card"><h3 className="mb-2 text-lg">Upcoming appointment</h3>{up[0]?<p className="text-sm"><b>{up[0].id}</b> · {up[0].date} at {fmt(up[0].start)} · {up[0].services.map(s=>s.name).join(', ')} · {inr(up[0].total)} <Badge v={up[0].status}/></p>:<Empty>No upcoming appointments. <Link to="/client/book" className="text-gold underline">Book now</Link></Empty>}</div>
    <OfferSlider/><div className="card"><h3 className="mb-2 text-lg">Previous appointments</h3>{prev.length?prev.map(a=><p key={a.id} className="border-b border-beige/60 py-2 text-sm">{a.date} · {a.services.map(s=>s.name).join(', ')} · {inr(a.total)}</p>):<Empty/>}</div></div>;
}
function Book(){
  const {services,liveOffers,session,book,toast}=useApp();const [q]=useSearchParams();
  const active=services.filter(s=>s.active);
  const [sel,setSel]=useState(()=>{const c=q.get('s');return c&&active.some(s=>s.code===c)?[c]:[]});
  const [offer,setOffer]=useState(()=>liveOffers.some(o=>o.id===q.get('offer'))?q.get('offer'):'');
  const [date,setDate]=useState(iso(new Date()));const [start,setStart]=useState('');
  const [f,setF]=useState({name:session.name,phone:session.phone||'',email:session.email,notes:''});const [e,setE]=useState({});const [done,setDone]=useState(null);
  const chosen=active.filter(s=>sel.includes(s.code));const dur=calculateServiceDuration(chosen),sub=calculateTotalPrice(chosen);
  const off=liveOffers.find(o=>o.id===offer);const pct=off?off.discount:0,disc=Math.round(sub*pct/100);
  const u=k=>({value:f[k],onChange:ev=>setF({...f,[k]:ev.target.value}),className:'input'});
  const submit=()=>{const x={};
    if(!chosen.length)x.services='Select at least one service';if(f.name.trim().length<2)x.name='Enter your name';
    if(!/^\d{10}$/.test(f.phone))x.phone='Enter a 10-digit phone number';if(!/^\S+@\S+\.\S+$/.test(f.email))x.email='Enter a valid email';if(!start)x.start='Choose a time slot';
    setE(x);if(Object.keys(x).length)return;
    try{setDone(book({type:'Online',customer:{name:f.name.trim(),phone:f.phone,email:f.email},date,start,services:chosen,discountPct:pct,notes:f.notes,userId:session.id}));setSel([]);setStart('')}catch(err){toast(err.message)}};
  return <div className="space-y-6"><h1 className="text-2xl">Book Appointment</h1>
    <section><h2 className="mb-3 text-xl">1. Select services</h2>{e.services&&<p className="mb-2 text-sm text-red-600">{e.services}</p>}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{active.map(s=><ServiceCard key={s.id} s={s} checked={sel.includes(s.code)} onToggle={()=>setSel(l=>l.includes(s.code)?l.filter(c=>c!==s.code):[...l,s.code])}/>)}</div></section>
    <div className="grid gap-6 lg:grid-cols-2">
      <section className="card space-y-3"><h2 className="text-xl">2. Booking summary</h2>
        {chosen.length?<>{chosen.map(s=><p key={s.code} className="flex justify-between text-sm"><span>{s.name} – {s.duration} min</span><b>{inr(s.price)}</b></p>)}
        <Field label="Offer"><select className="input" value={offer} onChange={ev=>setOffer(ev.target.value)}><option value="">No offer</option>{liveOffers.map(o=><option key={o.id} value={o.id}>{o.title} ({o.discount}%)</option>)}</select></Field>
        <div className="border-t border-beige pt-2 text-sm"><p className="flex justify-between">Subtotal<span>{inr(sub)}</span></p>{disc>0&&<p className="flex justify-between text-green-700">Discount<span>-{inr(disc)}</span></p>}
        <p className="flex justify-between text-base font-semibold">Total Price<span>{inr(sub-disc)}</span></p><p className="flex justify-between">Total Duration<span>{dur} minutes</span></p></div></>:<Empty>No services selected.</Empty>}
        <p className="text-xs text-charcoal/60">Payment is made at the salon.</p></section>
      <section className="card space-y-3"><h2 className="text-xl">3. Date & time</h2><SlotPicker date={date} setDate={setDate} duration={dur} start={start} setStart={setStart}/>{e.start&&<p className="text-xs text-red-600">{e.start}</p>}
        {start&&<p className="text-sm">Selected: <b>{fmt(start)} – {fmt(toMin(start)+dur)}</b></p>}</section></div>
    <section className="card grid gap-4 md:grid-cols-2"><h2 className="text-xl md:col-span-2">4. Your details</h2>
      <Field label="Name" error={e.name}><input {...u('name')}/></Field><Field label="Phone" error={e.phone}><input {...u('phone')}/></Field><Field label="Email" error={e.email}><input {...u('email')}/></Field><Field label="Notes (optional)"><input {...u('notes')}/></Field>
      <button className="btn-gold md:col-span-2" disabled={!chosen.length} onClick={submit}>Book Now</button></section>
    {done&&<Modal title="Booking confirmed" onClose={()=>setDone(null)}><div className="space-y-2 text-sm"><CheckCircle2 className="text-green-600" size={36}/><p>Order ID: <b>{done.id}</b></p><p>{done.date}, {fmt(done.start)} – {fmt(done.end)}</p><p>{done.services.map(s=>s.name).join(', ')}</p><p>Total: <b>{inr(done.total)}</b> (pay at salon) · Status: <Badge v={done.status}/></p></div><Link to="/client/history" className="btn-gold mt-4 w-full">View booking history</Link></Modal>}</div>;
}
function Hist(){
  const {appointments,session,cancel}=useApp();const [c,setC]=useState(null);const m=mine(appointments,session);
  return <div className="space-y-4"><h1 className="text-2xl">Booking History</h1><div className="card">{m.length?<Table heads={['Order ID','Date','Time','Services','Total','Status','Payment','']}>{m.map(a=><tr key={a.id}><td className="td font-medium">{a.id}</td><td className="td">{a.date}</td><td className="td">{fmt(a.start)}–{fmt(a.end)}</td><td className="td">{a.services.map(s=>s.name).join(', ')}</td><td className="td">{inr(a.total)}</td><td className="td"><Badge v={a.status}/></td><td className="td"><Badge v={a.payment}/></td>
      <td className="td">{['Pending','Confirmed'].includes(a.status)&&isFuture(a)&&<button className="text-xs text-red-600 underline" onClick={()=>setC(a)}>Cancel</button>}</td></tr>)}</Table>:<Empty/>}</div>
    {c&&<Confirm msg={`Cancel appointment ${c.id}? The time slot will be released.`} onNo={()=>setC(null)} onYes={()=>{cancel(c.id);setC(null)}}/>}</div>;
}
export default function Client(){return <DashShell title="Client" links={links}><Routes><Route index element={<Overview/>}/><Route path="book" element={<Book/>}/><Route path="history" element={<Hist/>}/></Routes></DashShell>}
