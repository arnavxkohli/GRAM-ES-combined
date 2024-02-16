'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

function GradientDivider() {
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

function NavBar({ route }) {
  return (
    <div className="mb-2 pt-5 pl-10 pr-10 flex items-center">
      <Link href={route}>
        <div className="inline-block mr-5">
          <button className="inline-flex items-center justify-center w-20 px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-500">
            <img alt='' height={20} width={20} src={'/icons/exit.svg'} />
          </button>
        </div>
      </Link>
      <div className="p-3 text-3xl font-bold font-[Kanit]">Profile Section</div>
    </div>
  );
}

function ProfileCard({ imageUrl, name, email }) {
  const profileCardStyle = {
    maxWidth: '100%',
    textAlign: 'center',
  };

  return (
    <div style={profileCardStyle}>
      <div className="w-32 h-32 rounded-full overflow-hidden mx-auto">
        <img src={imageUrl} alt="Profile" className="w-full h-full object-cover" />
      </div>
      <p className="mt-2 text-xl font-bold">{name}</p>
      <p className="mt-2 text-lg">{email}</p>
    </div>
  );
}

function RectangularButton({ text, route, icon }) {
  const buttonStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    marginBottom: '0.8rem',
  };

  return (
    <div style={buttonStyle}>
      <Link href={route}>
        <button className="inline-flex items-center px-4 py-2 bg-gray-400 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-500">
          <img alt='' height={30} width={30} src={icon} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
          <span style={{ verticalAlign: 'middle' }}>{text}</span>
        </button>
      </Link>
    </div>
  );
}

export default function Profile() {
  const cardContainerStyle = {
    position: 'absolute',
    top: 'calc(53% + 2rem)',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '30%', // Adjusted width to 80% of the viewport
    height: '80%',
    maxWidth: '40rem', // Maximum width set to 40rem
    padding: '2rem', // Increased padding
    backgroundColor: '#d1d5db',
    borderRadius: '0.75rem',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  return (
    <main className='font-[Kanit]'>
      <div className='p-2' style={{ minHeight: '100vh', overflowY: 'auto' }}>
        <NavBar route={'/web-app'} />
        <GradientDivider />
        {/* Card container */}
        <div style={cardContainerStyle}>
          <div className="mt-8">
          <ProfileCard imageUrl="/icons/user.svg" name="John Doe" email="email123@example.com" />
          </div>
          <div className="mt-8 flex flex-col items-center" >
          <RectangularButton text="Edit Profile Settings" route="/web-app" icon="/icons/settings.svg" />
          <RectangularButton text="Edit Bin Settings" route="/web-app" icon="/icons/sliders.svg"  />
          </div>
        </div>
      </div>
    </main>
  );
}
