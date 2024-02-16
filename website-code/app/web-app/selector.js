import React, { useState, useEffect } from "react";

function Symbol({ svgCode, fillColor, dimensions }) {
    return (
      <div className="pl-[3rem]">
        <svg
          fill={fillColor}
          height={dimensions}
          viewBox="0 0 24 24"
          width={dimensions}
          xmlns="http://www.w3.org/2000/svg"
        >
          {svgCode}
        </svg>
      </div>
    );
}

function SideBarButton({ selected, svgCode, accompanyText, onClick }) {
    const [hover, setHover] = useState(false);

    const toggleHover = () => {
        setHover(!hover);
    }

    return (
      <button
        className={`m-0 font-[Kanit] outline outline-1 flex justify-evenly items-center h-[8rem] w-[16rem] outline-black ${
          hover ? 'bg-[#11235A] text-[#FDBF60]' : (selected ? 'bg-white text-black' : 'bg-black text-white')
        }`}
        onClick={onClick}
        onMouseEnter={toggleHover}
        onMouseLeave={toggleHover}
      >
        <Symbol
          className="flex-1"
          fillColor={hover ? "#FDBF60" : (selected ? "#000000" : "#FFFFFF")}
          dimensions={"32"}
          svgCode={svgCode}
        />
        <p className="text-2xl text-left pl-[1rem] pr-[1.5rem] flex-1 overflow-hidden whitespace-nowrap overflow-ellipsis">
          {accompanyText}
        </p>
      </button>
    );
}

export default function SideBar({ bins }) {
    // Use fetched buttons to define logic for how many buttons get rendered.
    const [buttons, setButtons] = useState(bins);

    useEffect(() => {
      setButtons(bins);
    }, [bins]);

    const handleButtonClick = (id) => { // change selected button
        setButtons((prevButtons) =>
        prevButtons.map((button) =>
            button.id === id ? { ...button, selected: true } : { ...button, selected: false }
        )
        );
        if(id > 0 && typeof window !== 'undefined'){
          localStorage.setItem('binId', id);
          window.dispatchEvent(new CustomEvent('binIdChanged', { detail: id }));
        }
    };
    // return svg for add or for a bin in case of selection
    return (
        <div>
        {buttons.map((button) => (
            <SideBarButton
            key={button.id}
            selected={button.selected}
            svgCode={
                button.type === 'bin'
                ?
                <path d="m16.13,23H5.835c-.768,0-1.409-.576-1.491-1.341L2.556,5h16.886l-.219,2h1.006l.219-2h1.552v-1h-6v-1.5c0-1.379-1.121-2.5-2.5-2.5h-5c-1.379,0-2.5,1.121-2.5,2.5v1.5H0v1h1.551l1.799,16.767c.137,1.273,1.205,2.233,2.485,2.233h10.295c1.198,0,2.203-.847,2.439-2h-1.049c-.21.583-.744,1-1.389,1ZM7,2.5c0-.827.673-1.5,1.5-1.5h5c.827,0,1.5.673,1.5,1.5v1.5H7v-1.5Zm17,6.5v1h-8v-1h8Zm-8,5h7v1h-7v-1Zm0,5h6v1h-6v-1Z"/>
                :
                <path d="m12 0a12 12 0 1 0 12 12 12.013 12.013 0 0 0 -12-12zm0 22a10 10 0 1 1 10-10 10.011 10.011 0 0 1 -10 10zm5-10a1 1 0 0 1 -1 1h-3v3a1 1 0 0 1 -2 0v-3h-3a1 1 0 0 1 0-2h3v-3a1 1 0 0 1 2 0v3h3a1 1 0 0 1 1 1z"/>
            }
            accompanyText={button.accompanyText}
            onClick={() => handleButtonClick(button.id)}
            />
        ))}
        </div>
    );
}
