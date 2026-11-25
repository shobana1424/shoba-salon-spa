import {useEffect} from 'react';import {useApp} from '../../context/AppContext';
import {getAvailableSlots,iso} from '../../utils/appointments';
// Shared by Admin offline booking and Client booking: same availability function.
export default function SlotPicker({date,setDate,duration,start,setStart}){
  const {appointments}=useApp();const slots=getAvailableSlots(appointments,date,duration);
  useEffect(()=>{if(start&&!slots.some(s=>s.time===start&&s.available))setStart('')});
  return <div className="space-y-3">
    <input type="date" className="input" min={iso(new Date())} value={date} onChange={e=>{setDate(e.target.value);setStart('')}}/>
    {!duration?<p className="text-sm text-charcoal/60">Select services to see available time slots.</p>:
    <><div className="grid grid-cols-3 gap-2 sm:grid-cols-4">{slots.map(s=><button type="button" key={s.time} disabled={!s.available} onClick={()=>setStart(s.time)}
      className={`rounded-lg border px-2 py-2 text-sm ${s.time===start?'border-gold bg-gold text-white':s.available?'border-gold/50 bg-white hover:bg-gold/10':'cursor-not-allowed border-beige bg-beige/50 text-charcoal/30 line-through'}`}>{s.label}</button>)}</div>
    {!slots.some(s=>s.available)&&<p className="text-sm text-red-600">No slot with {duration} continuous minutes is free on this date.</p>}</>}
  </div>;
}
