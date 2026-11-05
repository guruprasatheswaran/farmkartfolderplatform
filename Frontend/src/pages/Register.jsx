import { useState } from 'react'; 
import { Link, useNavigate } from 'react-router-dom'; 
import AuthLayout from './AuthLayout';
 import { api } from '../services/api';
export default function Register(){
    const [form,setForm]=useState({name:'',email:'',password:'',confirmPassword:''}),[error,setError]=useState(''),[loading,setLoading]=useState(false);
    const navigate=useNavigate();
    const submit=async e=>{e.preventDefault();
        if(form.password!==form.confirmPassword)return setError('Passwords do not match.');
        setError('');setLoading(true);
        try{await api.register(form);
            navigate('/login',{state:{message:'Registration successful. Please log in.'}})}
        catch(err){setError(err.message)}
        finally{setLoading(false)}};
        return <AuthLayout title="Start growing smarter" alternate={<>Already registered? <Link to="/login">Login</Link></>}><form onSubmit={submit}>
            <label>Name<input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></label>
        <label>Email<input type="email" required value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/></label>
        <label>Password<input type="password" required minLength="6" value={form.password} onChange={e=>setForm({...form,password:e.target.value})}/></label>
        <label>Confirm password<input type="password" required minLength="6" value={form.confirmPassword} onChange={e=>setForm({...form,confirmPassword:e.target.value})}/></label>{error&&<p className="error">{error}</p>}<button disabled={loading}>{loading?'Creating…':'Create account'}</button></form></AuthLayout>}
