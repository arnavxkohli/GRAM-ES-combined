import Image from 'next/image';

export default function Footer(){
    function Icon({ path }){
      return (
        <div className='py-4'>
          <button className='px-8'>
            <Image alt='' height={27} width={27} src={path}/>
          </button>
        </div>
      );
    }
    return(
      <div className='bg-[#11235A]'>
        <div className='flex items-center justify-center pt-6'>
          <Icon path={'/icons/facebook.svg'}/>
          <Icon path={'/icons/instagram.svg'}/>
          <Icon path={'/icons/x.svg'}/>
          <Icon path={'/icons/linkedin.svg'}/>
        </div>
        <p className='flex items-center justify-center text-2xl text-[#FFECD6] font-semibold font-[kanit] pt-16 pb-12'> © GRAM™ 2024</p>
      </div>
    );
  }