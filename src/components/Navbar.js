import React from 'react';
import { Link } from 'react-router-dom';

export const NavBar = () => (
<nav className='navbar'>
	<ul>
		<li>
			<Link to="/">Home</Link>
		</li>
		<li>
			<Link to="/providertypes">Provider Types</Link>
		</li>
		<li>
			<Link to="/about">About</Link>
		</li>
	</ul>
</nav>
)