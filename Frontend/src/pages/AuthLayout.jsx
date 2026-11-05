import { Link } from 'react-router-dom';
export default function AuthLayout({ title, children, alternate }) {
     return <main className="auth-page">
        <section className="auth-card">
            <div className="brand auth-brand">🌱 FarmKart</div>
<p className="eyebrow">AGRICULTURE, MADE CLEAR</p>
<h1>{title}</h1>{children}<p className="switch">{alternate}</p></section></main>; }
