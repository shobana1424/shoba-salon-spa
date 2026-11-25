import {motion} from 'framer-motion';
export const pop=(i=0)=>({initial:{opacity:0,y:30},whileInView:{opacity:1,y:0},viewport:{once:true,amount:0.1},transition:{duration:.6,delay:(i%4)*.1}});
export const Reveal=({children,i=0,className=''})=><motion.div {...pop(i)} className={className}>{children}</motion.div>;
