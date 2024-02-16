'use client';

import Footer from "../footer";
import SectionHeading from "../section-heading";
import Body from "./body.js"
import NavBar from "../navbar";
import Video from "./video";
import { useRef } from "react";

function About() {
    return (
        <div>
            <div className="px-24 pt-[6em] pb-[6em] font-serif">
                <SectionHeading heading={"EcoBin Mk1: The smartest home waste solution"}/>
                <p className="px-[4rem] pt-3 pb-6 text-center text-[1.1rem]">
                    EcoBin Mk1 redefines home waste management with its advanced, hands-free operation &ndash; a wave of your hand is all it takes to open it, ensuring a hygienic and touchless experience. This smart dustbin is not just about convenience; it&apos;s a testament to the importance of hygiene in our daily lives, significantly reducing the spread of germs and bacteria. In addition to its hygienic prowess, EcoBin Mk1 stands as a beacon of environmental consciousness. Its sophisticated system is adept at detecting various materials, promoting responsible waste segregation and recycling. But that&apos;s not all &ndash; EcoBin goes a step further in safety with its integrated battery and metal detection system, alongside a vigilant fire and smoke detection mechanism. This ensures a safer home environment, protecting your family and the planet. Experience the seamless blend of hygiene, environmental responsibility, and safety with EcoBin Mk1.
                </p>
            </div>
        </div>
    );
}


export default function Mk1(){
    const backgroundStyle = {
        backgroundImage: "url('/bodybg.jpg')",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat", // Ensure the image doesn't repeat
        backgroundSize: "cover",
        width: "100%",
        height: "100%",
        margin: "0",
        padding: "0",
      };

      const overlayStyle = {
        backgroundColor: "rgba(31, 37, 68, 0.7)",
        inset: "0",
    };

      // Scroll to a specific ref
    const scrollToRef = (ref) => {
        window.scrollTo({
        top: ref.current.offsetTop,
        behavior: 'smooth'
        });
    };

    const aboutRef = useRef(null);
    const featuresRef = useRef(null);
    const videoRef = useRef(null);

    return(
        <div className="text-white" style={backgroundStyle}>
            <div className="p-2" style={overlayStyle}>
                <NavBar
                titles={['About', 'Features', 'Video']}
                onTitleClick={(title) => {
                    if (title === 'About') scrollToRef(aboutRef);
                    else if (title === 'Features') scrollToRef(featuresRef);
                    else if (title === 'Video') scrollToRef(videoRef);
                }}
                />
                <div ref={aboutRef}><About /></div>
                <div ref={featuresRef}><Body /></div>
                <div ref={videoRef}>
                    <SectionHeading heading={'Product Video'}/>
                    <div className='flex my-[6rem] justify-center items-center'><Video videoId={'qugjc1h1NWQ'}/></div>
                </div>
            </div>
            <Footer />
        </div>
    )
}