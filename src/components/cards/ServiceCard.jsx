import {Clock} from 'lucide-react';import {motion} from 'framer-motion';import {pop} from '../common/Reveal';
import Visual from './Visual';import {inr} from '../../utils/appointments';
export default function ServiceCard({s,checked,onToggle,action}){
  return <motion.div {...pop()} className={`card overflow-hidden !p-0 transition-shadow hover:shadow-xl ${checked?'ring-2 ring-gold':''}`}>
    <Visual cat={s.category}/>
    <div className="space-y-2 p-4">
      <div className="flex items-start justify-between gap-2"><h3 className="text-lg">{s.name}</h3><span className="rounded bg-beige px-2 py-0.5 text-xs">{s.code}</span></div>
      <p className="text-xs text-charcoal/60">{s.category}</p><p className="text-sm text-charcoal/70">{s.description}</p>
      <div className="flex items-center justify-between text-sm"><b className="text-gold">{inr(s.price)}</b><span className="flex items-center gap-1"><Clock size={14}/>{s.duration} min</span></div>
      {onToggle&&<label className="flex cursor-pointer items-center gap-2 text-sm"><input type="checkbox" checked={checked} onChange={onToggle} className="accent-[#C6A66B]"/>Select service</label>}
      {action}
    </div></motion.div>;
}
