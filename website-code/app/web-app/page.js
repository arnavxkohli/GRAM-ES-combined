"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Bin from './bin.js';
import CircularGauge from './gauge.js';
import SideBar from './selector.js';
import MessageBox from './messages.js';
import { logout, fetchBins } from '../requests.js';
import { useRouter } from "next/navigation";

let uId;

if(typeof window !== 'undefined'){
  uId = localStorage.getItem('uId'); // check for server side render, common practice for next.js
}

function GradientDivider(){
  const gradientBorder = {
    borderTop: "7px solid transparent",
    borderImage: "linear-gradient(45deg, #5e3ccf, #1693db) 1",
  };

  return (
    <div className="relative w-full">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full" style={gradientBorder}></div>
      </div>
    </div>
  );
};

function Icon({ path, route }){
    return (
      <div className='py-4'>
        <Link href={route}>
          <button className='px-8'>
            <Image alt='' height={27} width={27} src={path}/>
          </button>
        </Link>
      </div>
    );
  }

function LogOutButton() {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await logout();
      router.push('/sign-in');
    } catch (error) {
      // Handle error if logout fails
      console.error('Logout failed:', error);
      router.push('/');
    }
  };

  return (
    <div className="inline-block">
      <button onClick={handleLogout} className="inline-flex items-center px-4 py-2 mb-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-500">
        <Image alt='' height={20} width={20} src={'/icons/exit.svg'} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
        <span style={{ verticalAlign: 'middle' }}>Log Out</span>
      </button>
    </div>
  );
}

function NavBar() {
  return (
    <div className="p-[1.8rem] flex justify-between">
      <div className="p-3 text-4xl font-bold">Hello, {uId}</div>
      <div className="flex items-center space-x-2">
        <Icon path={'/icons/user.svg'} route={'/profile'} />
        <LogOutButton />
      </div>
    </div>
  );
}

function Body({ binId }) {
    const [curBinId, setCurBinId] = useState(binId);

    useEffect(() => {
        const handleBinIdChange = (event) => {
            setCurBinId(event.detail);
        };

        window.addEventListener('binIdChanged', handleBinIdChange);

        // Clean up
        return () => {
            window.removeEventListener('binIdChanged', handleBinIdChange);
        };
    }, []);

  return(
    <div className="flex-1">
      <div className="flex p-6 justify-center items-center">
        <div className="flex-1">
          <div className="bg-gray-200 mx-8 rounded-lg shadow-md flex justify-center items-center">
            <Bin binId={curBinId} uId={uId}/>
          </div>
        </div>
        <div className="flex-1">
          {/* Square container with adjusted dimensions */}
          <div className='px-16 pb-8'>
            <MessageBox />
          </div>
          <div className="bg-gray-200 rounded-lg shadow-md flex flex-col justify-between" >
          <div className="grid grid-cols-2 p-8 gap-8 ml-8">
              {/* First gauge */}
              <div>
                <CircularGauge binId={curBinId} uId={uId} sensorType={'air_quality'}  />
              </div>
              {/* Second gauge */}
              <div>
                <CircularGauge binId={curBinId} uId={uId} sensorType={'magnetic'}   />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RenderBody(){
  const [bins, setBins] = useState([]);
  useEffect(() => {
    const defaultValue = []; // Default value for bins if fetch fails

    fetchBins(uId, defaultValue)
      .then(data => {
        console.log(data['data']);
        let binsArray = Object.keys(data['data']).map(key => ({
          id: parseInt(key.slice(2)),
          accompanyText: data['data'][key],
          selected: false
        }));
        binsArray.push({
          id: -1,
          accompanyText: 'Add Bin',
          selected: false
        })
        binsArray[0].selected = true;
        if(typeof window !== 'undefined'){
          localStorage.setItem('binId', binsArray[0].id);
        }
        // Store converted bins in state
        setBins(binsArray);
      })
      .catch(error => {
        console.error("Error fetching bins:", error);
      });
  }, []); // Empty dependency array ensures this effect runs only once on component mount
  let binId;
  if(typeof window !== "undefined") binId = localStorage.getItem("binId");
  return(
    <div className="flex justify-between">
      <Body binId={binId}/>
      <div className='border-l-[7px] border-[#5e3ccf] h-screen'>
        <SideBar bins={bins}/>
      </div>
    </div>
  );
}

export default function WebApp() {
  return (
    <main className="text-black font-[Kanit]" >
      <div className="">
        <NavBar />
        <GradientDivider />
        <RenderBody />
      </div>
    </main>
  );
}