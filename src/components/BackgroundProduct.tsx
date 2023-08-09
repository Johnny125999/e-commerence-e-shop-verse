import { twMerge } from 'tailwind-merge'

import NextImage from '@/components/NextImage'
import ShopNowButton from '@/components/ShopNowButton'

type BackgroundProductProps = {
  imagePath: string
  name: string
  description: string
  href: string
  className?: string
}

export default function BackgroundProduct({
  imagePath,
  name,
  description,
  href,
  className,
}: BackgroundProductProps) {
  return (
    <div
      className={twMerge(
        'relative flex flex-1 flex-col justify-end gap-4 bg-black p-6 rounded',
        className,
      )}
    >
      <div className="absolute bottom-6 z-10 flex w-2/3 flex-col gap-4 text-white ">
        <h3 className="truncate">{name}</h3>
        <p className="text-sm line-clamp-5">{description}</p>
        <ShopNowButton href={href} />
      </div>
      <NextImage
        alt="product-image"
        src={imagePath}
        sizes="100vw"
        fill
        style={{
          objectFit: 'contain',
        }}
      ></NextImage>
    </div>
  )
}
