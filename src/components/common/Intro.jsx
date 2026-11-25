import {useEffect} from 'react';import {motion} from 'framer-motion';
import face from '../../assets/images/logo-face.png';
const CX=78,CY=42; // cheek position (% of the image) where the brush touches
const dust=[...Array(16)].map((_,i)=>({l:CX-3+(i%8)*1,t:CY-2+Math.floor(i/8)*5,dx:(i%5-2)*8,dy:-30-(i%4)*10,c:i%2?'#fff':'#E7D3A7'}));
// Loader: logo face starts black & white, powder brush touches the cheek, gold colour spreads, then the site appears.
export default function Intro({onDone}){
  useEffect(()=>{
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){onDone();return}
    document.body.style.overflow='hidden';const t=setTimeout(onDone,4500);
    return()=>{clearTimeout(t);document.body.style.overflow=''};
  },[onDone]);
  const clip=`circle(0% at ${CX}% ${CY}%)`,open=`circle(150% at ${CX}% ${CY}%)`;
  return <motion.div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-ivory" initial={{opacity:1}} exit={{opacity:0,scale:1.04}} transition={{duration:.7}}>
    <button onClick={onDone} className="absolute right-5 top-5 text-xs uppercase tracking-widest text-charcoal/50 hover:text-gold">Skip</button>
    <motion.div className="absolute h-72 w-72 rounded-full bg-cream" initial={{scale:.6,opacity:0}} animate={{scale:1,opacity:1}} transition={{duration:1}}/>
    <div className="relative w-[min(50vw,220px)]">
      <motion.img src={face} alt="Shoba Salon & Spa" className="block w-full" style={{filter:'grayscale(1)'}} initial={{opacity:0,scale:.95}} animate={{opacity:1,scale:1}} transition={{duration:.9}}/>
      <motion.img src={face} alt="" aria-hidden className="absolute inset-0 w-full" initial={{clipPath:clip}} animate={{clipPath:open}} transition={{delay:1.6,duration:1.5,ease:'easeInOut'}}/>
      {dust.map((d,i)=><motion.span key={i} className="absolute h-1.5 w-1.5 rounded-full" style={{left:`${d.l}%`,top:`${d.t}%`,background:d.c}} initial={{opacity:0}} animate={{opacity:[0,.95,0],x:[0,d.dx],y:[0,d.dy],scale:[.5,1.6]}} transition={{delay:1.6+i*.05,duration:1}}/>)}
      <motion.div className="pointer-events-none absolute" style={{marginLeft:-14,marginTop:-30}} initial={{left:'140%',top:'0%',opacity:0}}
        animate={{left:['140%','88%','80%','86%','79%','86%','140%'],top:['0%',`${CY-6}%`,`${CY}%`,`${CY-2}%`,`${CY+2}%`,`${CY-1}%`,'0%'],opacity:[0,1,1,1,1,1,0]}}
        transition={{duration:2.2,delay:.9,times:[0,.3,.4,.55,.7,.82,1],ease:'easeInOut'}}>
        <svg width="130" height="60" viewBox="0 0 130 60" className="overflow-visible" style={{transform:'rotate(-25deg)',transformOrigin:'14px 30px'}}><ellipse cx="14" cy="30" rx="15" ry="13" fill="#3a3036"/><rect x="26" y="22" width="24" height="16" rx="3" fill="#d0d0d0"/><rect x="48" y="25" width="80" height="10" rx="5" fill="#C6A66B"/></svg></motion.div>
    </div>
    <motion.div className="relative mt-8 text-center" initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:3,duration:.7}}>
      <h1 className="text-2xl">Shoba <span className="text-gold">Salon & Spa</span></h1><p className="mt-1 text-xs uppercase tracking-[0.25em] text-charcoal/60">Beauty, Elegance & Confidence</p></motion.div>
  </motion.div>;
}
