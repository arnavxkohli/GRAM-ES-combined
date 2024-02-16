import Link from 'next/link';
import SectionHeading from './section-heading';

export default function About() {
    function SignButton({text, route}){
      return(
        <Link href={route}>
          <button className={"m-4 rounded-full hover:text-[#11009E] hover:bg-[#92C7CF] text-[#EBD9B4] bg-[#1F289C] text-xl py-4 px-12"}>
            {text}
          </button>
        </Link>
      )
    }

    return (
      <div className="px-24 pt-[6em] pb-[6em] font-serif">
          <SectionHeading heading={"EcoBin: Empowering Smart Waste Management"}/>
          <p className="px-[4rem] pt-3 pb-6 text-center text-[1.1rem]">
          EcoBin is the pioneer in state-of-the-art waste management technology,
          ushering in a new era of intelligence in handling refuse. Immerse yourself
          in the sophistication of our innovative solutions as we go beyond mere disposal,
          offering a comprehensive approach to waste management.
          Within the heart of our smart dustbins lies a sophisticated system designed to
          meticulously categorize waste, ensuring every item finds its rightful place in
          the ecosystem of sustainability. Not merely content with this ingenuity, EcoBin
          introduces a groundbreaking feature – the ability to monitor fill levels in
          real-time. Witness the synergy of form and function as our bins dynamically
          adapt to the demands of their contents.
          </p>
          <div className="flex px-16 p-8 items-center justify-center">
            <div className="flex items-center justify-center flex-1"> <SignButton text="Sign Up" route={"/sign-up"}/> </div>
            <div className="flex items-center justify-center flex-1"> <SignButton text="Sign In" route={"/sign-in"}/></div>
          </div>
      </div>
    );
}