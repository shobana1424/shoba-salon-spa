import {useEffect,useState} from 'react';import {Link} from 'react-router-dom';
import {AnimatePresence,motion} from 'framer-motion';import {img} from '../../assets/photos';import {useApp} from '../../context/AppContext';
export default function OfferSlider({to='/client/book'}){
  const {liveOffers}=useApp();const [i,setI]=useState(0);
  useEffect(()=>{if(liveOffers.length<2)return;const t=setInterval(()=>setI(x=>(x+1)%liveOffers.length),4000);return()=>clearInterval(t)},[liveOffers.length]);
  if(!liveOffers.length) return <div className="card text-center text-sm">No active offers right now.</div>;
  const o=liveOffers[i%liveOffers.length];
  return <div className="relative overflow-hidden rounded-2xl bg-charcoal text-white" style={{minHeight:180}}>
    <img src={[img.bridal,img.facial,img.hairSteam,img.hairWash][i%4]} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30"/><div className="absolute inset-0 opacity-30" style={{background:'linear-gradient(120deg,#C6A66B,transparent)'}}/>
    <AnimatePresence mode="wait"><motion.div key={o.id} initial={{opacity:0,x:30}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-30}} className="relative flex flex-col items-start gap-2 p-6">
      <span className="serif text-4xl text-gold">{o.discount}% OFF</span><h3 className="text-2xl">{o.title}</h3>
      <p className="text-sm text-white/80">{o.description}</p><p className="text-xs text-white/60">Valid until {o.validTo}</p>
      <Link to={`${to}?offer=${o.id}`} className="btn-gold mt-2">Book Now</Link></motion.div></AnimatePresence>
    <div className="absolute bottom-3 right-4 flex gap-1.5">{liveOffers.map((x,k)=><button key={x.id} aria-label="slide" onClick={()=>setI(k)} className={`h-2 w-2 rounded-full ${k===i%liveOffers.length?'bg-gold':'bg-white/40'}`}/>)}</div>
  </div>;
}
