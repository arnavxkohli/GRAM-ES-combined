'use client'
import Image from 'next/image';
import NavBar from './navbar';
import About from './about';
import Products from './products';
import Contact from './contact';
import Footer from './footer';
import { useRef } from 'react';

export default function GRAM() {
  const backgroundStyle = {
    backgroundImage: "url('/bodybg.jpg')",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat", // Ensure the image doesn't repeat
    backgroundSize: "cover",
    width: "100vw",
    height: "100%",
    margin: "0",
    padding: "0",
  };

  const overlayStyle = {
    backgroundColor: "rgba(31, 37, 68, 0.7)",
    inset: "0",
  };

  const aboutRef = useRef(null);
  const productsRef = useRef(null);
  const contactRef = useRef(null);

  // Scroll to a specific ref
  const scrollToRef = (ref) => {
    window.scrollTo({
      top: ref.current.offsetTop,
      behavior: 'smooth'
    });
  };

  return (
    <main className="text-white" style={backgroundStyle}>
      <div className="p-2" style={overlayStyle}>
        <NavBar
          titles={['About', 'Products', 'Contact']}
          onTitleClick={(title) => {
            if (title === 'About') scrollToRef(aboutRef);
            else if (title === 'Products') scrollToRef(productsRef);
            else if (title === 'Contact') scrollToRef(contactRef);
          }}
        />
        <div ref={aboutRef}><About /></div>
        <div ref={productsRef}><Products /></div>
        <div ref={contactRef}><Contact /></div>
      </div>
      <Footer />
    </main>
  );
}
