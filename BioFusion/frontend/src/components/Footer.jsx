import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
    return (
        <div className="md:mx-10">
            <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
                <div>
                    <img className="mb-5 w-44" src={assets.logo1} alt="" />
                    <p className="w-full md:w-2/3 text-gray-600 leading-6">Bridging the gap between doctors and patients with
                        seamless appointment management, secure prescriptions, and
                        personalized healthcare solutions.We are a team of doctors who care about your health. We provide the best medical services to our patients.Your health, our priority.</p>
                </div>
                <div>
                    <p className="text-xl font-medium mb-5">COMPANY</p>
                    <ul className="flex flex-col gap-2 text-gray-600">
                        <li><a href="/" className=" hover:underline">Home</a></li>
                        <li><a href="/About" className=" hover:underline">About us</a></li>
                        <li><a href="/Contact" className=" hover:underline">Contact us</a></li>
                        <li>Privacy policy</li>
                    </ul>
                </div>
                <div>
                    <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
                    <ul className="flex flex-col gap-2 text-gray-600">
                        <li>(408) 123‑4567</li>
                        <li>support@biofusion.com</li>
                    </ul>
                </div>
            </div>
            <div>
                <p className="py-5 text-sm text-center">Copyright © 2025 BioFusion. All rights reserved.</p>
            </div>
        </div>
    )
}

export default Footer
