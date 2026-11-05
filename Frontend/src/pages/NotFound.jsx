import {Link}from 'react-router-dom';
export default function NotFound(){
    return <main className="not-found">
    <h1>404</h1>
<p>This field is not on the map.</p>
<Link className="button" to="/">Return home</Link></main>}
