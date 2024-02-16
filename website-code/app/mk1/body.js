import Link from 'next/link';
import SectionHeading from '../section-heading';
import Image from 'next/image';
import Video from './video.js'

export default function Body(){
    function FeatureBlock({ title, text, orientation, picture1,picture2, picture_size1, pic_size2 }) {

      let Component;
      if (orientation === 'left') {
        Component = (
          <div className='flex p-12'>
            <div className='flex-1 p-6'>
              <h2 className='font-sans p-5 font-semibold text-3xl'>{title}</h2>
              <div className='pt-2 p-5'>
                <p className='text-justify'>{text}</p>
              </div>
            </div>
            <div className='flex flex-1 p-6 items-center justify-center flex-col'>
              <Image alt={title} height={picture_size1} width={picture_size1} src={picture1} />
              <Image height={pic_size2} width={pic_size2} src={picture2} />
            </div>
          </div>
        );
      } else {
        Component = (
          <div className='flex p-12'>
            <div className='flex flex-1 flex-col p-6 items-center justify-center '>
              <Image alt={title} height={picture_size1} width={picture_size1} src={picture1} />
              <Image height={pic_size2} width={pic_size2} src={picture2} />
            </div>
            <div className='flex-1 p-6'>
              <h2 className='font-sans p-5 font-semibold text-3xl text-right'>{title}</h2>
              <div className='pt-2 p-5'>
                <p className='text-justify'>{text}</p>
              </div>
            </div>
          </div>
        );
      }
      return Component;
    }

    return(
      <div className='p-24 py-10 font-serif'>
        <SectionHeading heading={"Features"}/>
        <FeatureBlock
        title='Attractive UI Display'
        text='Experience the ultimate convenience with our EcoBin app, designed to seamlessly integrate with your EcoBin Mk 1. The app boasts an attractive, user-friendly interface, allowing you to manage multiple bins effortlessly. Registering your bins is a breeze - simply enter the unique activation code for each bin to sync it with the app. Stay informed and in control with real-time updates on your bin&apos;s status. Plus, get excited for an upcoming feature: smart home integration. Soon, you&apos;ll be able to connect EcoBin with your smart home system for an even more streamlined waste management experience. Our app also plays a crucial role in safety, alerting you to any battery disposal or fire hazards, ensuring you&apos;re always one step ahead in maintaining a safe and efficient environment.'
        orientation='left'
        picture1='/UI.png'
        picture2={''}
        picture_size1={500}
        picture_size2={0}
        />
        <FeatureBlock
        title='Fill level tracking'
        text='Dealing with trash just got smarter and less bothersome with EcoBin&apos;s innovative fill level tracking feature. Gone are the days of guessing when to empty your bin. Our advanced technology keeps a vigilant eye on the fill level, ensuring you&apos;re alerted well before it reaches capacity. Through the EcoBin app, receive timely notifications on your phone when the fill level approaches a set threshold. This proactive approach not only saves you the inconvenience of dealing with overfilled bins but also ensures a cleaner, more hygienic environment. Additionally, in line with our commitment to a holistic waste management solution, the app provides warnings for potential overflow, integrating seamlessly with the fill level tracking to maintain the perfect balance between convenience and cleanliness.'
        orientation='right'
        picture1='/fill.png'
        picture2={'/filltxt.png'}
        picture_size1={350}
        pic_size2={350}
        />
        <FeatureBlock
          title='Hands Free Operation'
          text='One of EcoBin&apos;s standout features is its innovative self-opening lid, utilizing advanced sensor technology to detect motion within proximity. This hands-free operation not only enhances convenience but also promotes optimal hygiene by minimizing contact with potentially harmful bacteria and odors. Say goodbye to messy, germ-ridden surfaces and hello to a cleaner, more efficient solution for disposing of your waste. Whether in a bustling kitchen, busy office, or high-traffic public space, the self-opening mechanism ensures effortless access while maintaining a pristine environment. Embrace the future of waste disposal with EcoBin Mk 1.'
          orientation='left'
          picture1='/bin.jpg'
          picture2={''}
          picture_size1={350}
          pic_size2={0}
        />
        <FeatureBlock
          title='Air Quality & Fire Detection'
          text="EcoBin goes beyond traditional waste management by incorporating cutting-edge technology to ensure not just cleanliness, but also safety. Equipped with state-of-the-art CO2 ppm sensors, it continuously monitors air quality, providing real-time data to help you maintain a healthier indoor environment. By keeping tabs on carbon dioxide levels, our EcoBin aids in optimizing ventilation and airflow, contributing to improved overall comfort and well-being. Moreover, safety is paramount, which is why our EcoBin is also equipped with advanced fire detection abilities. Using sophisticated sensors, it can swiftly detect any signs of smoke or fire, triggering immediate alerts on our app and it will lock itself shut to prevent potential hazards before they escalate. The bin is designed to automatically close itself, effectively containing any fire until someone intervenes to extinguish it manually by opening the bin. This safety feature ensures that the fire remains confined within the bin, mitigating potential risks until proper action is taken."
          orientation='right'
          picture1='/dials.png'
          picture2={'/firetxt.png'}
          picture_size1={400}
          pic_size2={400}
        />
        <FeatureBlock
          title='Battery & Metal Detection'
          text="Leveraging advanced magnetic field sensors to identify and segregate batteries effectively. This innovative feature ensures that batteries, notorious for their potential hazards, are promptly detected and separated from regular waste streams. In addition, if children accidentally dispose of batteries in the bin, caregivers will be promptly notified to prevent any potential dangers. Improper disposal of batteries poses significant risks to both human health and the environment, as they contain toxic chemicals that can leak and contaminate soil and water sources. Moreover, when mixed with other waste types, batteries can cause fires, leading to severe damage and endangering lives. By incorporating precise battery detection technology, we aim to mitigate these risks and promote responsible waste management practices."
          orientation='left'
          picture1='/magdial.png'
          picture2={'/batttxt.png'}
          picture_size1={400}
          pic_size2={400}
        />
      </div>
    );
  }