// Shared appointment utilities used by BOTH Admin and Client screens.
export const OPEN=540,CLOSE=1080,STEP=30;
const p=n=>String(n).padStart(2,'0');
export const iso=d=>`${d.getFullYear()}-${p(d.getMonth()+1)}-${p(d.getDate())}`;
export const addDays=(d,n)=>{const x=new Date(d);x.setDate(x.getDate()+n);return x};
export const toMin=t=>{const [h,m]=t.split(':').map(Number);return h*60+m};
export const toTime=m=>`${p(Math.floor(m/60))}:${p(m%60)}`;
export const fmt=t=>{const m=typeof t==='number'?t:toMin(t);const h=Math.floor(m/60);return `${h%12||12}:${p(m%60)} ${h>=12?'PM':'AM'}`};
export const inr=n=>'₹'+Number(n||0).toLocaleString('en-IN');
export const calculateServiceDuration=s=>s.reduce((a,x)=>a+Number(x.duration),0);
export const calculateTotalPrice=s=>s.reduce((a,x)=>a+Number(x.price),0);
export const checkAppointmentConflict=(list,date,start,dur,ignoreId)=>{
  const s=toMin(start),e=s+dur;
  return list.some(a=>a.id!==ignoreId&&a.status!=='Cancelled'&&a.date===date&&s<toMin(a.end)&&toMin(a.start)<e);
};
export const validateSlot=(list,date,start,dur,now=new Date())=>{
  if(!date) return 'Select a date';
  if(!(dur>0)) return 'Select at least one service';
  if(!start) return 'Select a time slot';
  const s=toMin(start);
  if(date<iso(now)) return 'Past dates cannot be booked';
  if(date===iso(now)&&s<=now.getHours()*60+now.getMinutes()) return 'Past times cannot be booked';
  if(s<OPEN) return 'Salon opens at 9:00 AM';
  if(s+dur>CLOSE) return 'Appointment must end by 6:00 PM';
  if(checkAppointmentConflict(list,date,start,dur)) return 'This time overlaps another appointment';
  return null;
};
export const getAvailableSlots=(list,date,dur)=>{
  const out=[];
  for(let m=OPEN;m<CLOSE;m+=STEP){const t=toTime(m);out.push({time:t,label:fmt(m),available:dur>0&&!validateSlot(list,date,t,dur)});}
  return out;
};
export const createAppointment=(list,{type,customer,date,start,services,discountPct=0,notes='',userId=null})=>{
  const duration=calculateServiceDuration(services);
  const err=validateSlot(list,date,start,duration); if(err) throw new Error(err);
  let id; do{id=`ORD-${date.replace(/-/g,'')}-${Math.floor(1000+Math.random()*9000)}`}while(list.some(a=>a.id===id));
  const subtotal=calculateTotalPrice(services),discount=Math.round(subtotal*discountPct/100);
  const appt={id,type,customer,date,start,end:toTime(toMin(start)+duration),duration,
    services:services.map(({code,name,price,duration,category})=>({code,name,price,duration,category})),
    subtotal,discount,total:subtotal-discount,status:type==='Online'?'Pending':'Confirmed',payment:'Pending',notes,userId,createdAt:new Date().toISOString()};
  return {list:[appt,...list],appt};
};
export const cancelAppointment=(list,id)=>list.map(a=>a.id===id?{...a,status:'Cancelled'}:a); // releases the slot
