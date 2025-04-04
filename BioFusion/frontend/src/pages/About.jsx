import { assets } from "../assets/assets";

const About = () => {
  return (

    <div className="py-12 px-6 md:px-12 lg:px-20">
      {/* --------- About Us Header --------- */}
      <div className="text-center">
        <h2 className="text-3xl font-medium text-gray-800">
          About <span >BioFusion</span>
        </h2>
        <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
          Empowering healthcare with seamless access, smart technology, and personalized solutions.
        </p>
      </div>

      {/* --------- About Us Content --------- */}
      <div className="mt-12 flex flex-col md:flex-row items-center gap-10">
        <img
          className="w-full md:max-w-md rounded-lg shadow-md"
          src={assets.about_image}
          alt="About BioFusion"
        />
        <div className="flex flex-col gap-6 text-gray-700 text-base md:w-3/5">
          <p>
            Welcome to <b>BioFusion</b>, your all-in-one healthcare management platform. We strive to
            make scheduling appointments, accessing medical records, and connecting with healthcare providers
            seamless and efficient.
          </p>
          <p>
            Our technology-driven approach enhances user experience by integrating smart health solutions,
            ensuring that managing your healthcare is simple and stress-free.
          </p>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Our Vision</h3>
            <p className="mt-2">
              At BioFusion, we aim to revolutionize healthcare accessibility by bridging the gap
              between patients and providers. Our goal is to empower individuals with reliable, efficient,
              and innovative healthcare solutions tailored to their needs.
            </p>
          </div>
        </div>
      </div>

      {/* --------- Why Choose BioFusion --------- */}
      <div className="mt-16 text-center">
        <h2 className="text-3xl font-bold text-gray-800">
          Why <span >BioFusion?</span>
        </h2>
        <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
          Experience the future of healthcare management with our advanced platform.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
          <div className="p-8 border rounded-lg shadow-md bg-white hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer">
            <h3 className="text-lg font-semibold">Seamless Integration</h3>
            <p className="mt-2 text-sm">
              Effortlessly schedule appointments, access medical records, and manage healthcare from one centralized platform.
            </p>
          </div>

          <div className="p-8 border rounded-lg shadow-md bg-white hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer">
            <h3 className="text-lg font-semibold">Smart Health Insights</h3>
            <p className="mt-2 text-sm">
              Receive personalized health recommendations and timely reminders to stay on top of your well-being.
            </p>
          </div>

          <div className="p-8 border rounded-lg shadow-md bg-white hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer">
            <h3 className="text-lg font-semibold">Enhanced Accessibility</h3>
            <p className="mt-2 text-sm">
              Gain instant access to healthcare services, doctors, and medical records anytime, anywhere.
            </p>
          </div>
        </div>
      </div>
    </div>


  );
};

export default About;