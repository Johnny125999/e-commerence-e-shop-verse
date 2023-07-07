import { Facebook, Instagram, Linkedin, Twitter } from 'react-feather';

import NextImage from '@/components/NextImage';

export default function Footer() {
  return (
    <div className='mt-[8.75rem] h-[27.5rem] bg-black px-[8.4375rem] pb-6 pt-20'>
      <div className='flex items-start gap-[5.4375rem]'>
        <div className='flex flex-col gap-6'>
          <h3>Exclusive</h3>
          <h4 className='font-medium'>Subscribe</h4>
          <p>Get 10% off your first order</p>
        </div>
        <div className='flex flex-col gap-6'>
          <h4 className='font-medium'>Support</h4>
          <div className='flex flex-col gap-4'>
            <p>111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.</p>
            <p>exclusive@gmail.com</p>
            <p>+88015-88888-9999</p>
          </div>
        </div>
        <div className='flex flex-col gap-6'>
          <h4 className='font-medium'>Account</h4>
          <div className='flex flex-col gap-4'>
            <p>My Account</p>
            <p>Login / Register</p>
            <p>Cart</p>
            <p>Wishlist</p>
            <p>Shop</p>
          </div>
        </div>
        <div className='flex flex-col gap-6'>
          <h4 className='font-medium'>Quick Link</h4>
          <div className='flex flex-col gap-4'>
            <p>Privacy Policy</p>
            <p>Terms Of Use</p>
            <p>FAQ</p>
            <p>Contact</p>
          </div>
        </div>
        <div className='flex flex-col gap-6'>
          <h4 className='font-medium'>Quick Link</h4>
          <div className='flex flex-col gap-2'>
            <p className='text-xs'>Save $3 with App New User Only</p>
            <div className='flex gap-2'>
              <div className='bg-brown-300 h-20 w-20'>QR Code Here!</div>
              <div className='flex flex-col gap-2'>
                <NextImage
                  alt='product-image'
                  src='/images/google-play_button.png'
                  width={104}
                  height={30}
                  style={{
                    objectFit: 'contain',
                  }}
                ></NextImage>
                <NextImage
                  alt='product-image'
                  src='/images/apple_button.png'
                  sizes='100vw'
                  width={104}
                  height={30}
                  style={{
                    objectFit: 'contain',
                  }}
                ></NextImage>
              </div>
            </div>
          </div>
          <div className='flex items-center gap-6'>
            <Facebook />
            <Twitter />
            <Instagram />
            <Linkedin />
          </div>
        </div>
      </div>
    </div>
  );
}
