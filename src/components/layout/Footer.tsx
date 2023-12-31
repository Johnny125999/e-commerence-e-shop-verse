'use client'

import Link from 'next/link'
import { Facebook, Instagram, Linkedin, Twitter } from 'react-feather'
import { MdSend } from 'react-icons/md'

import NextImage from '@/components/NextImage'

export default function Footer() {
  function handleSubscribeToNewsletter() {
    alert('Not implemented yet.')
  }

  return (
    <div className="row-start-3 mt-[8.75rem] bg-black px-2 pb-6 pt-20 text-white sm:px-8">
      <div className="flex flex-col items-center justify-center gap-4 divide-y md:flex-row md:flex-wrap md:items-start md:justify-between md:divide-y-0 2xl:gap-[5.4375rem]">
        <div className="flex w-full max-w-[17.5rem] flex-col gap-4 md:w-auto md:max-w-max">
          <div className="flex flex-col gap-6">
            <h3>E-Shopverse</h3>
            <h4 className="font-medium">Subscribe</h4>
            <p>Get 10% off your first order</p>
          </div>
          <div className="flex items-center gap-3 rounded border border-white px-3 py-4 transition focus-within:border-green-700 hover:border-green-700 sm:gap-8">
            <input
              className=" border-none bg-black p-0 placeholder:text-gray-400 focus:ring-0"
              placeholder="Enter your e-mail"
              type="text"
            />
            <MdSend
              onClick={handleSubscribeToNewsletter}
              className="h-5 w-5 cursor-pointer transition hover:fill-gray-600 sm:h-6 sm:w-6"
            />
          </div>
        </div>
        <div className="flex w-full max-w-[17.5rem] flex-col gap-6 pt-4 md:w-auto md:max-w-max">
          <h4 className="font-medium">Support</h4>
          <div className="flex flex-col gap-4">
            <div>
              <p>111 Bijoy sarani, Dhaka,</p>
              <p>DH 1515, Bangladesh.</p>
            </div>
            <p>eshopeverse@gmail.com</p>
            <p>+88015-88888-9999</p>
          </div>
        </div>
        <div className="flex w-full max-w-[17.5rem] flex-col gap-6 pt-4 md:w-auto md:max-w-max">
          <h4 className="font-medium">Quick Link</h4>
          <div className="flex flex-col gap-4">
            <Link
              scroll={false}
              href="#"
              className="border-b border-b-transparent transition-all hover:border-b-white"
            >
              Privacy Policy
            </Link>
            <Link
              scroll={false}
              href="#"
              className="border-b border-b-transparent transition-all hover:border-b-white"
            >
              Terms Of Use
            </Link>
            <Link
              scroll={false}
              href="#"
              className="border-b border-b-transparent transition-all hover:border-b-white"
            >
              FAQ
            </Link>
            <Link
              scroll={false}
              href="#"
              className="border-b border-b-transparent transition-all hover:border-b-white"
            >
              Contact
            </Link>
          </div>
        </div>
        <div className="flex w-full max-w-[17.5rem] flex-col items-center  gap-6 pt-4 md:w-auto md:max-w-max ">
          <h4 className="font-medium">Download App</h4>
          <div className="flex flex-col gap-2">
            <p className="text-xs">Save $3 with App New User Only</p>
            <div className="flex gap-2">
              <div className="h-20 w-20 bg-brown-300">QR Code Here!</div>
              <div className="flex flex-col gap-2">
                <NextImage
                  alt="google play button"
                  src="/images/google-play_button.png"
                  width={104}
                  height={30}
                  style={{
                    objectFit: 'contain',
                  }}
                ></NextImage>
                <NextImage
                  alt="app store button"
                  src="/images/apple_button.png"
                  sizes="100vw"
                  width={104}
                  height={30}
                  style={{
                    objectFit: 'contain',
                  }}
                ></NextImage>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <Facebook />
            <Twitter />
            <Instagram />
            <Linkedin />
          </div>
        </div>
      </div>
    </div>
  )
}
