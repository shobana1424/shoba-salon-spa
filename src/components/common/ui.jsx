import {useEffect} from 'react';import {X} from 'lucide-react';
export const Modal=({title,onClose,children,wide})=>{
  useEffect(()=>{document.body.style.overflow='hidden';return()=>{document.body.style.overflow=''}},[]);
  return (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
    <div className={`max-h-[90vh] w-full overflow-y-auto rounded-2xl bg-white p-6 ${wide?'max-w-3xl':'max-w-lg'}`} onClick={e=>e.stopPropagation()}>
      <div className="mb-4 flex items-center justify-between"><h3 className="text-xl">{title}</h3><button onClick={onClose} aria-label="Close"><X size={20}/></button></div>{children}
    </div></div>);};
export const Confirm=({msg,onYes,onNo})=>(
  <Modal title="Please confirm" onClose={onNo}><p className="mb-5 text-sm">{msg}</p>
    <div className="flex justify-end gap-2"><button className="btn-out" onClick={onNo}>No</button><button className="btn-gold" onClick={onYes}>Yes</button></div></Modal>);
export const Field=({label,error,children})=>(<label className="block text-sm"><span className="mb-1 block font-medium">{label}</span>{children}{error&&<span className="mt-1 block text-xs text-red-600">{error}</span>}</label>);
export const Stat=({icon:I,label,value})=>(<div className="card flex items-center gap-4"><div className="rounded-full bg-gold/15 p-3 text-gold"><I size={22}/></div><div><div className="text-xs text-charcoal/60">{label}</div><div className="serif text-xl">{value}</div></div></div>);
const col={Pending:'bg-amber-100 text-amber-800',Confirmed:'bg-blue-100 text-blue-800',Cancelled:'bg-red-100 text-red-800',Completed:'bg-green-100 text-green-800',Paid:'bg-green-100 text-green-800',Online:'bg-purple-100 text-purple-800',Offline:'bg-beige text-charcoal'};
export const Badge=({v})=><span className={`rounded-full px-2 py-0.5 text-xs font-medium ${col[v]||'bg-beige'}`}>{v}</span>;
export const Table=({heads,children})=>(<div className="overflow-x-auto"><table className="w-full min-w-[560px]"><thead className="border-b border-beige"><tr>{heads.map(h=><th key={h} className="th">{h}</th>)}</tr></thead><tbody className="divide-y divide-beige/60">{children}</tbody></table></div>);
export const Empty=({children='Nothing to show yet.'})=><p className="py-6 text-center text-sm text-charcoal/50">{children}</p>;
