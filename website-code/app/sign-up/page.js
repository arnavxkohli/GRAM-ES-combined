'use client'; // Add use client pragma

import Link from "next/link";
import { useState, useRef, forwardRef } from "react";
import { sendSignUp } from "../requests";
import { useRouter } from "next/navigation";

function Content() {
    const router = useRouter();
// Create refs for each input field
    const emailRef = useRef();
    const passwordRef = useRef();
    const rpasswordRef = useRef();

    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
            rpassword: rpasswordRef.current.value
        };
        console.log("Form Data:", formData);

        try {
            // Call sendSignUp function with formData
            const response = await sendSignUp(formData);
            console.log('Sign up successful:', response);

            if(typeof window !== "undefined"){
                localStorage.setItem('uId', formData.email);
            }

            // Redirect to "/web-app"
            router.push('/web-app');
            // Perform any further action after successful sign up
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
                className="transition-all bg-black border-2 focus:placeholder-black border-transparent hover:bg-[#352F44] focus:text-black focus:bg-white focus:outline-none mb-10 px-6 py-5 peer rounded-lg text-xl font-extralight focus:border-white text-white"
                placeholder={placeholder}
            />
        );
    });

    InputField.displayName = 'InputField';

    return (
        <div>
            <div className="text-[#EBD9B4] text-center text-[2.3rem] p-8">
                Sign Up
            </div>
            <form onSubmit={handleSubmit}>
                <InputField type="email" name="email" placeholder="Email" ref={emailRef} />
                <InputField type="password" name="password" placeholder="Password" ref={passwordRef} />
                <InputField type="password" name="rpassword" placeholder="Password, Again" ref={rpasswordRef} />
                {error && <div className="text-red-500">{error}</div>} {/* Render error message if error state is not null */}
                <div className="flex justify-evenly px-5 pb-10">
                    <button type="submit" className={"m-5 mb-8 rounded-lg hover:text-[#EBD9B4] hover:bg-[#3C0753] text-black bg-white text-lg py-5 px-5"}>
                        Create Account
                    </button>
                    <Link href={"/sign-in"}>
                        <button className={"m-5 mb-8 rounded-lg hover:text-[#EBD9B4] hover:bg-[#3C0753] text-black bg-white text-lg py-5 px-12"}>
                            Sign In
                        </button>
                    </Link>
                </div>
            </form>
        </div>
    );
}


export default function SignUp() {
    const backgroundStyle = {
        backgroundImage: "url('/bodybg.jpg')",
        backgroundPosition: "center",
        width: "100%",
        height: "100%",
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
        <div className="text-center font-[Kanit]" style={backgroundStyle}>
            <div className="py-[3%] px-[33%]" style={overlayStyle}>
                <div className="bg-gradient-to-r from-[#11235A] to-[#492E87] inset-0 rounded-3xl">
                    <Content />
                </div>
            </div>
        </div>
    );
}
