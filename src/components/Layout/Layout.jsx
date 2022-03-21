import './Layout.scss';
import React from 'react';
import Footer from './Footer';
import Nav from './Nav';

function Layout({ children }) {
    return (
        <div className="container">
            <Nav />
            <main className="main">{children}</main>
            <Footer />
        </div>
    );
}
export default Layout;
