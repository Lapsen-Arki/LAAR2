import Footer from './Footer';
import Header from './Header';
import React from 'react';
import '../../styles/Layout.css';

interface LayoutProps {
	children: React.ReactNode;
}

export default function Layout(props: LayoutProps) {
	return (
		<div className="page-container">
			<Header />
			<div className="content-container">
				<div className='page'>{props.children}</div>
			</div>
			<Footer />
		</div>
	);
}
