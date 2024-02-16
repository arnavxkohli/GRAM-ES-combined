'use client'; // Add use client pragma

import Link from "next/link";
import { useState, useRef, forwardRef } from "react";
import { contact } from "./requests";
import SectionHeading from "./section-heading";

export default function Contact(){

    const nameRef = useRef();
    const emailRef = useRef();
    const messageRef = useRef();

    const [error, setError] = useState(null);

    const handleContact = async (e) => {
        e.preventDefault();
        const formData = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            message: messageRef.current.value
        };
        console.log("Form Data:", formData);

        try {
            const response = await contact(formData);
            console.log('Contact Form successful:', response);
        } catch (error) {
            console.error('Sign up failed:', error);
            // Handle sign up failure
            setError(`${error}. Please try again.`);
        }
    };

    const InputField = forwardRef(({ type, name, placeholder }, ref) => {
        return (
            <input
                type={type}
                name={name}
                ref={ref}
                className="transition-all bg-black border-2 focus:placeholder-black border-transparent hover:bg-[#352F44] focus:text-black focus:bg-white focus:outline-none mt-10 mx-10 px-6 py-5 peer rounded-lg text-lg font-extralight focus:border-white text-white"
                placeholder={placeholder}
            />
        );
    });

    InputField.displayName = 'InputField';

    return (
        <div className="px-[10rem] pb-[3em] font-serif">
            <SectionHeading heading={'Book a Consultation'}/>
            <p className="px-[10rem] py-10 text-center text-[1.1rem]">
                    Get in touch with us and get a personalized plan tailored to fit your needs. Whether you require a large scale waste solution for your company, or just a regular everyday smart Dustbin, we have you covered!
            </p>
            <div className="py-8 px-[4rem] flex justify-center"> {/* Added 'flex justify-center' to center the child elements */}
                <div className="bg-gradient-to-r from-[#11235A] to-[#492E87] rounded-3xl font-[Kanit]">
                    <div className="flex justify-center"> {/* Center the inputs and textarea */}
                        <div className="flex flex-col justify-center py-8 px-12"> {/* Adjusted flex direction to column and centered vertically */}
                            <InputField type="name" name="name" placeholder="Name" ref={nameRef} />
                            <InputField type="email" name="email" placeholder="Email" ref={emailRef} />
                            <textarea
                                type="message"
                                name="message"
                                placeholder="Please enter your requirements..."
                                ref={messageRef}
                                className="transition-all bg-black border-2 focus:placeholder-black border-transparent mt-10 mx-10 hover:bg-[#352F44] focus:text-black focus:bg-white focus:outline-none px-6 py-5 peer rounded-lg text-lg font-extralight focus:border-white text-white"
                                style={{ height: '150px' }} // Adjust height as needed
                            />
                        </div>
                    </div>
                    {error && <div className="text-red-500">{error}</div>} {/* Render error message if error state is not null */}
                    <div className="flex items-center justify-center pb-3 mb-5 ">
                        <button type="submit" className={"w-[15rem] rounded-lg hover:text-[#EBD9B4] hover:bg-[#3C0753] text-black bg-white text-xl py-5 px-5 my-3"}>
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>


    );
}