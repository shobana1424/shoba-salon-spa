import {useState} from 'react';import {Link} from 'react-router-dom';import {motion,useScroll,useTransform} from 'framer-motion';import {img} from '../../assets/photos';import {pop} from '../../components/common/Reveal';
import {Award,Heart,ShieldCheck,Sparkles,Star,MapPin,Phone,Mail,Clock,Target,Eye} from 'lucide-react';
import {useApp} from '../../context/AppContext';import ServiceCard from '../../components/cards/ServiceCard';
import Visual from '../../components/cards/Visual';import OfferSlider from '../../components/cards/OfferSlider';
import {Modal,Field} from '../../components/common/ui';import {site} from '../../data/site';import {inr} from '../../utils/appointments';
const Head=({t,s})=><div className="mb-6 text-center"><h2 className="text-2xl md:text-3xl">{t}</h2>{s&&<p className="mx-auto mt-2 max-w-xl text-sm text-charcoal/60">{s}</p>}<div className="mx-auto mt-3 h-0.5 w-16 bg-gold"/></div>;
const Sec=({children,bg=''})=><section className={`px-4 py-10 md:py-12 ${bg}`}><motion.div className="mx-auto max-w-6xl" initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:0.05}} transition={{duration:.6}}>{children}</motion.div></section>;
const fade={initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},viewport:{once:true}};
const GAL=['Bridal','Hair Styling','Facial & Skincare','Salon Interior'];
const galCat=['Bridal Makeup','Hair Care','Facial','Spa'];
const Info=()=><div className="space-y-3 text-sm"><p className="flex gap-3"><MapPin className="text-gold" size={18}/>{site.address}</p><p className="flex gap-3"><Phone className="text-gold" size={18}/>{site.phone}</p><p className="flex gap-3"><Mail className="text-gold" size={18}/>{site.email}</p><p className="flex gap-3"><Clock className="text-gold" size={18}/>{site.hours}</p></div>;
const PageTop=({t})=><div className="relative overflow-hidden bg-charcoal py-12 text-center text-white"><img src={img.bridal} alt="" style={{objectPosition:'50% 30%'}} className="absolute inset-0 h-full w-full object-cover opacity-25"/><h1 className="relative text-2xl text-gold md:text-3xl">{t}</h1><div className="relative mx-auto mt-3 h-0.5 w-16 bg-gold"/></div>;
const Ph=({src,className='',pos='center'})=><div className={`group overflow-hidden rounded-2xl ${className}`}><img src={src} alt="Shoba Salon & Spa" loading="lazy" style={{objectPosition:pos}} className="h-full w-full object-cover transition duration-700 group-hover:scale-110"/></div>;
export function Home(){
  const {services}=useApp();const {scrollY}=useScroll();const y1=useTransform(scrollY,[0,600],[0,70]);const y2=useTransform(scrollY,[0,600],[0,-50]);
  return <>
  <section className="relative flex items-center overflow-hidden bg-gradient-to-br from-ivory via-cream to-beige md:min-h-[calc(100vh-110px)]">
    <div className="absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full border-[30px] border-gold/20"/><div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-rose/10"/>
    <div className="relative mx-auto grid w-full max-w-6xl items-center gap-8 px-4 py-8 md:grid-cols-2 md:py-10">
      <motion.div {...fade}>
        <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-white/70 px-4 py-1 text-xs uppercase tracking-[0.25em] text-gold"><Sparkles size={14}/>Women's Salon & Spa</span>
        <h1 className="mt-5 text-4xl leading-tight md:text-6xl">Shoba <span className="italic text-gold">Salon</span> & Spa</h1>
        <p className="serif mt-3 text-xl text-rose">{site.tagline}</p>
        <p className="mt-4 max-w-md text-sm leading-7 text-charcoal/70">Hair, skin, bridal and spa treatments in a calm, premium space. Pick your services, choose a free time slot and book online in minutes.</p>
        <div className="mt-8 flex flex-wrap gap-3"><Link to="/client/book" className="btn-gold">Book Appointment</Link><Link to="/services" className="btn-out">Explore Services</Link></div>
        <div className="mt-8 flex flex-wrap gap-6 text-xs text-charcoal/70"><span className="flex items-center gap-2"><Clock size={16} className="text-gold"/>Open 9 AM – 6 PM</span><span className="flex items-center gap-2"><ShieldCheck size={16} className="text-gold"/>Hygienic care</span><span className="flex items-center gap-2"><Star size={16} className="text-gold"/>Premium products</span></div></motion.div>
      <div className="relative mx-auto h-[340px] w-full max-w-sm md:h-[min(440px,60vh)] md:max-w-md">
        <motion.div style={{y:y1}} className="absolute left-0 top-0 h-[76%] w-[62%] overflow-hidden rounded-t-[999px] border-4 border-white shadow-2xl"><img src={img.bridal} alt="Bridal makeup" style={{objectPosition:'68% 30%'}} className="h-full w-full object-cover"/></motion.div>
        <motion.div style={{y:y2}} className="absolute bottom-0 right-0 h-[46%] w-[54%] overflow-hidden rounded-3xl border-4 border-white shadow-2xl"><img src={img.hairWash} alt="Hair wash" className="h-full w-full object-cover"/></motion.div>
        <motion.div style={{y:y1}} className="absolute right-2 top-4 h-32 w-32 overflow-hidden rounded-full border-4 border-gold shadow-xl"><img src={img.facial} alt="Facial treatment" className="h-full w-full object-cover"/></motion.div>
        <div className="absolute bottom-8 left-0 rounded-2xl bg-white/95 px-4 py-3 text-xs shadow-xl"><b className="serif block text-lg text-gold">Book online</b>Free slots update instantly</div></div></div></section>
  <Sec><Head t="Featured Services" s="Signature treatments crafted for you."/><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{services.filter(s=>s.active).slice(0,3).map(s=><ServiceCard key={s.id} s={s} action={<Link className="btn-gold w-full" to={`/client/book?s=${s.code}`}>Book Now</Link>}/>)}</div><div className="mt-8 text-center"><Link to="/services" className="btn-out">View all services</Link></div></Sec>
  <Sec bg="bg-cream"><Head t="Special Offers"/><OfferSlider/></Sec>
  <Sec><Head t="Why Choose Us"/><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{[[Award,'Expert Stylists','Skilled, certified professionals'],[ShieldCheck,'Hygienic Care','Sanitised tools every visit'],[Sparkles,'Premium Products','Gentle, trusted brands'],[Heart,'Personal Attention','Treatments tailored to you']].map(([I,t,d],i)=><motion.div key={t} {...pop(i)} className="card text-center transition hover:-translate-y-1 hover:shadow-xl"><div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gold/15"><I className="text-gold" size={26}/></div><h3 className="text-lg">{t}</h3><p className="text-sm text-charcoal/60">{d}</p></motion.div>)}</div></Sec>
  <Sec bg="bg-beige/40"><Head t="Our Gallery"/><div className="grid auto-rows-[170px] grid-cols-2 gap-3 md:auto-rows-[200px] md:grid-cols-4"><Ph src={img.hairWash} className="md:row-span-2"/><Ph src={img.facial}/><Ph src={img.hairWavy}/><Ph src={img.spaSteam} className="md:row-span-2"/><Ph src={img.bridal} pos="60% 28%" className="col-span-2"/></div><div className="mt-6 text-center"><Link to="/gallery" className="btn-out">View Full Gallery</Link></div></Sec>
  <Sec><Head t="What Our Clients Say"/><div className="grid gap-5 md:grid-cols-3">{[['Anitha','The bridal makeup was flawless and lasted all day.'],['Kavya','Calm ambience and a wonderful facial. Highly recommended.'],['Divya','Booking online was simple and the team was on time.']].map(([n,t],i)=><motion.div key={n} {...pop(i)} className="card"><div className="mb-2 flex text-gold">{[...Array(5)].map((_,k)=><Star key={k} size={16} fill="#C6A66B"/>)}</div><p className="text-sm italic">“{t}”</p><p className="mt-3 text-sm font-semibold">{n} <span className="font-normal text-charcoal/40">(demo review)</span></p></motion.div>)}</div></Sec>
  <section className="px-4 pb-14"><div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-charcoal p-8 text-center text-white md:p-12"><img src={img.bridal} alt="" style={{objectPosition:'60% 30%'}} className="absolute inset-0 h-full w-full object-cover opacity-25"/><div className="relative"><h2 className="text-2xl text-gold md:text-3xl">Ready for your glow-up?</h2><p className="mx-auto mt-3 max-w-md text-sm text-white/80">Choose your services, pick a free slot and we will have everything ready for you.</p><Link to="/client/book" className="btn-gold mt-6">Book Appointment</Link></div></div></section>
  <Sec bg="bg-cream"><Head t="Visit Us"/><div className="mx-auto max-w-md"><Info/></div></Sec></>;
}
export function About(){return <><PageTop t="Our Story & Vision"/>
  <Sec><div className="grid items-center gap-8 md:grid-cols-2"><div className="space-y-4 text-sm leading-7"><h2 className="text-2xl">Welcome to Shoba Salon & Spa</h2><p>Shoba Salon & Spa is a women's salon created to make every visit feel calm, luxurious and personal. From everyday hair care to complete bridal makeovers, our team brings skill and warmth to every service.</p><p>Our philosophy is simple: beauty and wellness go together. We combine gentle products, careful technique and a relaxing environment so you leave feeling confident.</p></div><div className="relative mx-auto h-96 w-full max-w-md"><div className="absolute right-4 top-4 h-64 w-64 rounded-full border-[14px] border-gold/25"/><img src={img.spaSteam} alt="Spa" className="absolute left-0 top-0 h-72 w-56 rounded-t-[999px] border-4 border-white object-cover shadow-xl"/><img src={img.hairSteam} alt="Hair spa" className="absolute bottom-0 right-0 h-60 w-52 rounded-3xl border-4 border-white object-cover shadow-xl"/></div></div></Sec>
  <Sec bg="bg-cream"><div className="grid gap-5 md:grid-cols-2">{[[Eye,'Our Vision','To be the most trusted destination for elegant, confident beauty.'],[Target,'Our Mission','Deliver premium, hygienic and personalised care at fair prices, in a welcoming space.']].map(([I,t,d])=><div key={t} className="card"><I className="mb-2 text-gold"/><h3 className="text-xl">{t}</h3><p className="text-sm text-charcoal/70">{d}</p></div>)}</div></Sec></>}
export function Services(){
  const {services,categories}=useApp();const [c,setC]=useState('All');
  const list=services.filter(s=>s.active&&(c==='All'||s.category===c));
  return <><PageTop t="Services"/><Sec><div className="mb-8 flex flex-wrap justify-center gap-2">{['All',...categories].map(x=><button key={x} onClick={()=>setC(x)} className={`rounded-full border px-4 py-1.5 text-sm ${c===x?'border-gold bg-gold text-white':'border-beige bg-white'}`}>{x}</button>)}</div>
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{list.map(s=><ServiceCard key={s.id} s={s} action={<Link className="btn-gold w-full" to={`/client/book?s=${s.code}`}>Book Now</Link>}/>)}</div>{!list.length&&<p className="text-center text-sm">No services in this category.</p>}</Sec></>;
}
export function Gallery(){
  const [f,setF]=useState('All');const [z,setZ]=useState(null);const items=[...Array(12)].map((_,i)=>({i,g:GAL[i%4],c:galCat[i%4]}));
  return <><PageTop t="Gallery"/><Sec><div className="mb-8 flex flex-wrap justify-center gap-2">{['All',...GAL].map(x=><button key={x} onClick={()=>setF(x)} className={`rounded-full border px-4 py-1.5 text-sm ${f===x?'border-gold bg-gold text-white':'border-beige bg-white'}`}>{x}</button>)}</div>
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">{items.filter(x=>f==='All'||x.g===f).map(x=><motion.div layout key={x.i} {...pop(x.i)} onClick={()=>setZ(x)} className="relative cursor-zoom-in overflow-hidden rounded-xl"><Visual cat={x.c} variant={Math.floor(x.i/4)} className="h-44"/><span className="absolute bottom-2 left-2 rounded bg-black/40 px-2 py-0.5 text-xs text-white">{x.g}</span></motion.div>)}</div>
    {z&&<Modal wide title={z.g} onClose={()=>setZ(null)}><Visual cat={z.c} variant={Math.floor(z.i/4)} className="h-[60vh] rounded-xl"/></Modal>}</Sec></>;
}
export function Offers(){
  const {offers,today}=useApp();
  return <><PageTop t="Offers"/><Sec><OfferSlider/><div className="mt-10 grid gap-5 md:grid-cols-3">{offers.filter(o=>o.active).map(o=>{const exp=o.validTo<today;return <div key={o.id} className={`card ${exp?'opacity-60':''}`}>
    <div className="serif text-3xl text-gold">{o.discount}% OFF</div><h3 className="mt-1 text-xl">{o.title}</h3><p className="text-sm text-charcoal/70">{o.description}</p>
    <p className="mt-2 text-xs">Example: <s>{inr(1000)}</s> <b>{inr(1000*(100-o.discount)/100)}</b></p><p className="text-xs text-charcoal/50">{exp?'Expired':`Valid until ${o.validTo}`}</p>
    {exp?<button disabled className="btn-gold mt-3 w-full">Expired</button>:<Link to={`/client/book?offer=${o.id}`} className="btn-gold mt-3 w-full">Book Now</Link>}</div>})}</div></Sec></>;
}
export function Contact(){
  const {toast}=useApp();const [f,setF]=useState({name:'',email:'',phone:'',msg:''});const [e,setE]=useState({});
  const send=ev=>{ev.preventDefault();const x={};
    if(f.name.trim().length<2)x.name='Enter your name';if(!/^\S+@\S+\.\S+$/.test(f.email))x.email='Enter a valid email';
    if(!/^\d{10}$/.test(f.phone))x.phone='Enter a 10-digit phone number';if(f.msg.trim().length<5)x.msg='Write a short message';
    setE(x);if(Object.keys(x).length)return;toast('Thanks! Your enquiry was recorded (demo - not sent anywhere).');setF({name:'',email:'',phone:'',msg:''});};
  const u=k=>({value:f[k],onChange:ev=>setF({...f,[k]:ev.target.value}),className:'input'});
  return <><PageTop t="Contact & Enquiry"/><Sec><div className="grid gap-8 md:grid-cols-2"><div className="space-y-6"><Info/><div className="flex h-52 items-center justify-center rounded-2xl border border-dashed border-gold bg-cream text-sm text-charcoal/50">Map placeholder</div></div>
    <form onSubmit={send} className="card space-y-4"><Field label="Name" error={e.name}><input {...u('name')}/></Field><Field label="Email" error={e.email}><input {...u('email')}/></Field><Field label="Phone" error={e.phone}><input {...u('phone')}/></Field><Field label="Message" error={e.msg}><textarea rows={4} {...u('msg')}/></Field><button className="btn-gold w-full">Send Enquiry</button></form></div></Sec></>;
}
