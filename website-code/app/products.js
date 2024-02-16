import Link from 'next/link';
import SectionHeading from './section-heading';
import Image from 'next/image';

export default function Products(){
    function ProductBlock({ title, text, orientation, picture, picture_size, buttons, links }) {

      function Buttons({ texts, links }) {
        return (
          <div className='flex justify-evenly'>
            {texts.map((text, index) => (
              <Link key={index} href={links[index]}>
                <button className={"m-4 rounded-full hover:text-[#11009E] hover:bg-[#92C7CF] text-[#EBD9B4] bg-[#1F289C] py-4 w-[11rem]"}>{text}</button>
              </Link>
            ))}
          </div>
        );
      }

      let Component;
      if (orientation === 'left') {
        Component = (
          <div className='flex p-12'>
            <div className='flex-1 p-6'>
              <h2 className='font-sans p-5 font-semibold text-3xl'>{title}</h2>
              <div className='pt-2 p-5'>
                <p>{text}</p>
                <div className='flex justify-start'><Buttons texts={buttons} links={links} /></div>
              </div>
            </div>
            <div className='flex flex-1 p-6 items-center justify-end'>
              <Image alt={title} height={picture_size} width={picture_size} src={picture} />
            </div>
          </div>
        );
      } else {
        Component = (
          <div className='flex p-12'>
            <div className='flex flex-1 p-6 items-center'>
              <Image alt={title} height={picture_size} width={picture_size} src={picture} />
            </div>
            <div className='flex-1 p-6'>
              <h2 className='font-sans p-5 font-semibold text-3xl text-right'>{title}</h2>
              <div className='pt-2 p-5'>
                <p className='text-right'>{text}</p>
                <div className='flex justify-end'><Buttons texts={buttons} links={links} /></div>
              </div>
            </div>
          </div>
        );
      }
      return Component;
    }

    return(
      <div className='p-24 py-10 font-serif'>
        <SectionHeading heading={"Products & Services"}/>
        <ProductBlock
          title='EcoBin Mk 1'
          text='The EcoBin Mark 1, is our simplest product. With the ability to open just at the wave of the hand, and track fill levels so your trash is never overflowing, it is the smartest home waste management solution on the block.'
          orientation='left'
          picture='/Mk1.jpeg'
          picture_size={350}
          buttons={['Learn More →', 'Product Video →']}
          links={['/mk1', 'https://drive.google.com/file/d/1Q179cT5rzPR2jh5_pEYfEHdTiBIxEmny/view?usp=sharing']}
        />
        <ProductBlock
          title='EcoBin Mk 2'
          text='Say goodbye to the woes of remembering which bin to put your waste in. The EcoBin Mk 2 is a groundbreaking solution for large-scale waste management in malls and airports. This advanced bin features an innovative auto-sorting system with separate compartments, each designed to accept only a certain type of waste. Whether it&apos;s recyclables, organics, or general waste, the EcoBin Mk 2 ensures efficient segregation and is highly customizable in the number of compartments, as well as type of waste sorted.'
          orientation='right'
          picture='/Mk2.jpeg'
          picture_size={350}
          buttons={[]}
          links={['/']}
        />
        <ProductBlock
          title='EcoChute Max'
          text='The EcoChute Max, an advanced underground sorting system, revolutionizes eco-conscious waste management. Complete with a data analytics suite, it is the most comprehensive large scale waste management solution on the market today. Integrating with both EcoBin models, it streamlines waste disposal, efficiently sorting and managing various waste types. Perfect for organizations aiming to outsource waste management, EcoChute Max offers a sustainable, efficient solution, minimizing environmental impact while enhancing operational effectiveness'
          orientation='left'
          picture='/Chute.png'
          picture_size={500}
          buttons={[]}
          links={['/']}
        />
      </div>
    );
  }