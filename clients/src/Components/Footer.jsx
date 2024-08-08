import { Footer } from 'flowbite-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

export default function FooterCom() {
  return (
    <Footer container className='border-t-8 border-teal-500 py-6'>
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="grid gap-8 sm:flex sm:justify-between md:grid-cols-1">
          <div className="mt-5 sm:mt-0">
            <Link to='/'>
              <div className="flex items-center text-lg sm:text-xl font-semibold dark:text-white">
                <span className="px-3 py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
                  THIYAGU
                </span>
                <span className="ml-2">Blog</span>
              </div>
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-12 mt-4 sm:grid-cols-3 sm:gap-8">
            <div>
              <Footer.Title title='SERVICES' className="text-base sm:text-lg" />
              <Footer.LinkGroup col>
                <span className="block text-sm sm:text-base">eCommerce Development</span>
                <span className="block text-sm sm:text-base">Web Designing & Development</span>
                <span className="block text-sm sm:text-base">Mobile Application</span>
                <span className="block text-sm sm:text-base">Digital Marketing</span>
                <span className="block text-sm sm:text-base">Data Analysis</span>
                <span className="block text-sm sm:text-base">Social Media Marketing</span>
              </Footer.LinkGroup>
            </div>

            <div>
              <Footer.Title title='ABOUT' className="text-base sm:text-lg" />
              <Footer.LinkGroup col>
                <span className="block text-sm sm:text-base">Services</span>
                <span className="block text-sm sm:text-base">Portfolio</span>
                <span className="block text-sm sm:text-base">Careers</span>
                <span className="block text-sm sm:text-base">Reviews</span>
                <span className="block text-sm sm:text-base">Contact</span>
              </Footer.LinkGroup>
            </div>

            <div>
              <Footer.Title title='CONTACT' className="text-base sm:text-lg" />
              <Footer.LinkGroup col>
                <span className="block text-sm sm:text-base">
                  Abul Fazal Enclave Part I, New Delhi, India
                </span>
                <span className="block text-sm sm:text-base">
                  innobyteservices@gmail.com
                </span>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>

        <Footer.Divider className="my-6" />
        <div className='w-full sm:flex sm:items-center sm:justify-between'>
        <Footer.Copyright 
        href='#'
        by="THIYAGU Blog. All rights reserved."
        year={new Date().g}/>
        <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
            <Footer.Icon href='https://github.com/THIYAGUSRI' icon={FaGithub}/>
            <Footer.Icon href='#' icon={FaLinkedin}/>
        </div>
       </div>
</div>
    </Footer>
  );
}
