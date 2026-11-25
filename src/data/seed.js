import {iso,addDays,toTime,toMin} from '../utils/appointments';
export const categories=['Hair Care','Skin Care','Bridal Makeup','Facial','Spa','Nail Care','Body Care'];
export const services=[
{id:'s1',code:'H001',name:'Hair Cut',category:'Hair Care',price:300,duration:30,description:'Precision cut with a styled finish.',active:true},
{id:'s2',code:'F001',name:'Facial',category:'Facial',price:800,duration:60,description:'Deep-cleansing facial for a radiant glow.',active:true},
{id:'s3',code:'B001',name:'Bridal Makeup',category:'Bridal Makeup',price:8000,duration:180,description:'Complete bridal look with HD makeup and styling.',active:true},
{id:'s4',code:'S001',name:'Hair Spa',category:'Spa',price:1000,duration:60,description:'Nourishing spa treatment for soft, shiny hair.',active:true},
{id:'s5',code:'M001',name:'Manicure',category:'Nail Care',price:500,duration:45,description:'Shaping, care and polish for beautiful hands.',active:true},
{id:'s6',code:'K001',name:'Skin Clean-up',category:'Skin Care',price:600,duration:45,description:'Gentle clean-up to refresh tired skin.',active:true},
{id:'s7',code:'BC001',name:'Body Massage',category:'Body Care',price:1500,duration:60,description:'Relaxing full-body massage with aroma oils.',active:true}];
export const offers=[
{id:'o1',title:'Bridal Glow Package',discount:20,validTo:iso(addDays(new Date(),45)),description:'20% off on bridal makeup bookings.',active:true},
{id:'o2',title:'Festive Hair Spa',discount:15,validTo:iso(addDays(new Date(),20)),description:'Pamper your hair this season.',active:true},
{id:'o3',title:'Monsoon Special (expired demo)',discount:10,validTo:iso(addDays(new Date(),-5)),description:'Expired offer - cannot be selected.',active:true}];
export const users=[
{id:'u-admin',name:'Salon Admin',email:'admin@shoba.demo',password:'admin123',phone:'',role:'admin'},
{id:'u-client',name:'Priya Demo',email:'client@shoba.demo',password:'client123',phone:'9000000001',role:'client'}];
const S=Object.fromEntries(services.map(s=>[s.code,s]));
const mk=(i,off,start,codes,type,status,name,phone)=>{
  const sv=codes.map(c=>S[c]),dur=sv.reduce((a,x)=>a+x.duration,0),sub=sv.reduce((a,x)=>a+x.price,0),date=iso(addDays(new Date(),off));
  return {id:`ORD-${date.replace(/-/g,'')}-${1000+i}`,type,customer:{name,phone,email:''},date,start,end:toTime(toMin(start)+dur),duration:dur,
   services:sv.map(({code,name,price,duration,category})=>({code,name,price,duration,category})),subtotal:sub,discount:0,total:sub,status,
   payment:status==='Completed'?'Paid':'Pending',notes:'',userId:phone==='9000000001'?'u-client':null,createdAt:new Date().toISOString()};};
const names=[['Anitha','9111111101'],['Kavya','9111111102'],['Divya','9111111103'],['Meena','9111111104'],['Priya Demo','9000000001']];
const past=[];
[[-1,'09:00',['H001','F001']],[-2,'10:00',['B001']],[-3,'11:00',['S001','M001']],[-5,'09:30',['K001','H001']],[-8,'13:00',['BC001']],[-12,'09:00',['F001']],[-15,'14:00',['B001']],[-20,'10:30',['H001','M001']],[-27,'12:00',['S001']],[-40,'09:00',['F001','K001']],[-55,'11:00',['B001']],[-70,'10:00',['BC001','H001']]]
.forEach(([o,t,c],i)=>{const n=names[i%5];past.push(mk(i,o,t,c,i%2?'Offline':'Online','Completed',n[0],n[1]))});
export const appointments=[mk(50,0,'10:00',['F001'],'Offline','Confirmed','Walk-in Meena','9111111104'),mk(51,1,'11:00',['H001','S001'],'Online','Pending','Priya Demo','9000000001'),...past];
export const notifications=[{id:'n1',type:'booking',msg:'Welcome! Demo notifications appear here.',read:false,at:new Date().toISOString()}];
