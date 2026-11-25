import {SceneArt} from './Illustrations';import {photos} from '../../assets/photos';
const pos=['center','30% 20%','70% 80%'],bpos=['68% 30%','45% 40%','85% 55%'];
const bg=[['#F8F4ED','#E9DDCC'],['#F4EBDD','#e3d0b0'],['#E9DDCC','#d6bf99'],['#2b2b2b','#4a3d26']];
// variant 0-3 changes the background tint so repeated categories look different.
export default function Visual({cat,className='h-40',variant=0}){const list=photos[cat];
  if(list) return <div className={`group overflow-hidden ${className}`}><img src={list[variant%list.length]} alt={`${cat} at Shoba Salon & Spa`} loading="lazy" style={{objectPosition:(cat==='Bridal Makeup'?bpos:pos)[variant%3]}} className="h-full w-full object-cover transition duration-700 group-hover:scale-110"/></div>;
  const [a,b]=bg[variant%4];
  return <div className={`group overflow-hidden ${className}`} style={{background:`linear-gradient(135deg,${a},${b})`}}>
    <svg viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" className="h-full w-full transition duration-700 group-hover:scale-110" role="img" aria-label={`${cat} illustration`}><SceneArt cat={cat}/></svg></div>}
