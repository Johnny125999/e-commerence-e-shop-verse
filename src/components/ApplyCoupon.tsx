import { useContext, useRef } from 'react';

import Button from '@/components/buttons/Button';

import { CouponContext } from '@/contexts/CouponContext';

type ApplyCouponProps = {
  subtotal: number;
};

export default function ApplyCoupon({ subtotal }: ApplyCouponProps) {
  const couponRef = useRef<HTMLInputElement>(null);
  const { handleApplyCoupon } = useContext(CouponContext);

  return (
    <div className='flex h-fit w-full items-center gap-4'>
      <input
        name='discount'
        ref={couponRef}
        type='text'
        className='w-full max-w-[18.75rem] rounded border border-gray-800 bg-transparent py-4 pl-6 focus:border-gray-600 focus:ring-green-600'
        placeholder='Coupon here'
      />
      <Button
        onClick={() => handleApplyCoupon(couponRef, subtotal)}
        variant='green'
        className='px-12 py-4'
      >
        Apply Coupon
      </Button>
    </div>
  );
}
