import { useState } from 'react'; 
import { Link, useNavigate } from 'react-router-dom';
 import AuthLayout from './AuthLayout';
  import { api } from '../services/api';
export default function Login(){
     const [form,setForm]=useState({email:'',password:''}),[error,setError]=useState(''),[loading,setLoading]=useState(false); 
     const navigate=useNavigate();
      const submit=async e=>{  e.preventDefault(); 
    // setError('');
    setLoading(true); 
    try{
        const user=await api.login(form);
        localStorage.setItem('farmkartUser',JSON.stringify(user)); 
        navigate('/'); 
    }catch(err){setError(err.message)}
    finally{setLoading(false)}};
 return <AuthLayout 
  title="Welcome back"
  alternate={
    <>
      New to FarmKart? <Link to="/register">Create an account</Link>
    </>
  }
>
  <form onSubmit={submit}>
    <label>
      Email
      <input
        type="email"
        required
        value={form.email}
        onChange={e =>
          setForm({
            ...form,
            email: e.target.value 
          })
        }
      />
    </label>

    <label>
      Password
      <input
        type="password"
        required
        minLength="6"
        value={form.password}
        onChange={e =>
          setForm({
            ...form,
            password: e.target.value
          })
        }
      />
    </label>

    {error && <p className="error">{error}</p>}

    <button disabled={loading}>
      {loading ? 'Signing in…' : 'Login'}
    </button>
  </form>
</AuthLayout>;}