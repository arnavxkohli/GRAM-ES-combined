'use client'; // Add use client pragma

import Link from "next/link";
import { useState, useRef, forwardRef } from "react";
import { sendSignIn } from "../requests";
import { useRouter } from "next/navigation";

function Content() {
    const router = useRouter();
// Create refs for each input field
    const emailRef = useRef();
    const passwordRef = useRef();

    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };
        console.log("Form Data:", formData);

        try {
            // Call sendSignUp function with formData
            const response = await sendSignIn(formData);
            console.log('Sign up successful:', response);

            if(typeof window !== "undefined"){
                localStorage.setItem('uId', formData.email);
            }
            // Redirect to "/web-app"
            router.push('/web-app');
            // Perform any further action after successful sign up
        } catch (error) {
            console.error('Sign in failed:', error);
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
                className="transition-all mb-[2.5rem] h-[4rem] w-[15rem] p-[1rem] bg-black border-2 focus:placeholder-black border-transparent hover:bg-[#352F44] focus:text-black focus:bg-white focus:outline-none md:mb-[3rem] md:w-[22rem] md:h-[5rem] md:p-[2rem] peer rounded-lg text-lg md:text-xl font-extralight focus:border-white text-white"
                placeholder={placeholder}
            />
        );
    });

    InputField.displayName = 'InputField';

    return (
        <div>
            <div className="text-[#EBD9B4] text-center md:text-[2.3rem] text-[1.9rem] pb-[4rem] pt-[4rem]">
                Sign In
            </div>
            <form onSubmit={handleSubmit}>
                <InputField type="email" name="email" placeholder="Email" ref={emailRef} />
                <InputField type="password" name="password" placeholder="Password" ref={passwordRef} />
                {error && <div className="text-red-500">{error}</div>} {/* Render error message if error state is not null */}
                <div className="flex justify-evenly px-5 my-4 md:my-6 pb-6">
                    <button type="submit" className={"mb-[10%] h-[3rem] w-[7rem] md:mb-8 rounded-lg hover:text-[#EBD9B4] hover:bg-[#3C0753] text-black bg-white md:text-lg md:h-[4rem] md:w-[10rem]"}>
                        Sign In
                    </button>
                    <Link href={"/sign-up"}>
                        <button className={"mb-[10%] h-[3rem] w-[7rem] text-sm md:mb-8 rounded-lg hover:text-[#EBD9B4] hover:bg-[#3C0753] text-black bg-white md:text-lg md:h-[4rem] md:w-[10rem]"}>
                            Sign Up
                        </button>
                    </Link>
                </div>
            </form>
        </div>
    );
}


export default function SignIn() {
    const backgroundStyle = {
        backgroundImage: "url('/bodybg.jpg')",
        backgroundPosition: "center",
        margin: "0",
        padding: "0",
    };

    const overlayStyle = {
        backgroundColor: "rgba(31, 37, 68, 0.7)",
        height: "100%",
        width: "100%",
        inset: "0",
    };

    return (
        <div className="text-center h-[120vh] w-screen font-[Kanit]" style={backgroundStyle}>
            <div className="px-[12%] py-[20%] md:py-[5%] md:px-[33%]" style={overlayStyle}>
                <div className="bg-gradient-to-r from-[#11235A] to-[#492E87] inset-0 rounded-3xl">
                    <Content />
                </div>
            </div>
        </div>
    );
}
