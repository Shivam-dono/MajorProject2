import { assets } from "../assets/assets";
import MoveUpOnRender from "../components/MoveUpOnRender"

const Contact = () => {
  return (
    <MoveUpOnRender id="contact">
      <div className="text-3xl text-center font-medium  mb-12">
        <p>
          CONTACT <span >BIOFUSION</span>
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row items-center justify-center gap-12">
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            className="w-full max-w-[400px] rounded-lg shadow-lg"
            src={assets.contact_image}
            alt="Contact BioFusion"
          />
        </div>
        
        <div className="w-full md:w-1/2 flex flex-col gap-6 text-gray-700">
          <p className="text-xl font-semibold">Our Office</p>
          <p className="text-gray-600">
            9876 Innovation Drive <br /> Suite 220, Silicon Valley, USA
          </p>
          <p className="text-gray-700">
            Tel: (408) 123‑4567 <br /> Email: support@biofusion.com
          </p>
          <p className="text-xl font-semibold">Careers at BioFusion</p>
          <p className="text-gray-700">
            Join our team and be part of groundbreaking innovations in biotech.
          </p>
          <button className="border border-black text-black px-6 py-3 rounded-lg shadow-md hover:bg-black hover:text-white transition-all duration-500">
            Explore Jobs
          </button>
        </div>
      </div>
    </MoveUpOnRender>
  );
};

export default Contact;
