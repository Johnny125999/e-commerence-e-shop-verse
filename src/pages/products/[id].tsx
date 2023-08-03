import {
  GetStaticProps,
  GetStaticPropsContext,
  GetStaticPropsResult,
  InferGetStaticPropsType,
} from 'next'
import { useRef, useState } from 'react'
import { Heart } from 'react-feather'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import { twMerge } from 'tailwind-merge'

import { getProductById, getProducts } from '@/lib/http'

import Button from '@/components/buttons/Button'
import NextImage from '@/components/NextImage'
import { ProductColor } from '@/components/ProductColor'
import Stars from '@/components/Stars'
import Steps from '@/components/Steps'

import { Product } from '@/contexts/ProductsContext'

type ProductProps = {
  product: Product
}

export default function Product({
  product,
}: InferGetStaticPropsType<GetStaticProps<ProductProps>>) {
  const [selectedSize, setSelectedSize] = useState<null | string>(null)

  const [images, setImages] = useState([
    product.image,
    '/images/keyboard.png',
    '/images/jbl-radio.png',
  ])

  const ref = useRef<HTMLDivElement | null>(null)

  function handleChangeImage(idx: number) {
    const imgs = [...images]
    const img = images[idx]
    imgs[idx] = imgs[imgs.length - 1]
    imgs[imgs.length - 1] = img

    setImages([...imgs])
  }

  const sizes: ['xs', 's', 'm', 'l', 'xl'] = ['xs', 's', 'm', 'l', 'xl']

  function handleSelectSize(size: string) {
    setSelectedSize(size)
  }

  return (
    <div className="px-[8.4375rem]">
      <Steps
        flow="product"
        currentStep={2}
        category="Gaming"
        productName={product.name}
      />
      <div className="flex w-full gap-[68px]">
        <div className="grid max-h-[37.5rem] w-full max-w-[43.875rem] grid-cols-[10.625rem_31.25rem] gap-8">
          <div className="flex flex-col gap-4">
            {images.slice(0, images.length - 1).map((i, idx) => (
              <div
                onClick={() => handleChangeImage(idx)}
                key={i}
                className="relative flex h-full w-[10.625rem] max-w-full touch-none items-center justify-center rounded bg-gray-200 p-4"
              >
                <NextImage
                  alt="product-image"
                  src={i}
                  width={134}
                  height={114}
                ></NextImage>
              </div>
            ))}
          </div>
          <div className="relative flex h-[37.5rem] w-[31.25rem] items-center justify-center rounded bg-gray-200 p-4">
            <SwitchTransition>
              <CSSTransition
                key={images[images.length - 1]}
                timeout={200}
                classNames="fade"
                nodeRef={ref}
                addEndListener={(done) => {
                  const aux = ref.current as HTMLDivElement
                  aux.addEventListener('transitionend', done, false)
                }}
              >
                <div ref={ref}>
                  <NextImage
                    alt="product-image"
                    src={images[images.length - 1]}
                    width={446}
                    height={315}
                  ></NextImage>
                </div>
              </CSSTransition>
            </SwitchTransition>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col gap-4">
            <h3>{product.name}</h3>
            <Stars
              numberOfEvaluations={product.evaluations}
              numberOfStars={product.stars}
            />
            <p className="text-sm">{product.description}</p>
          </div>
          <div className="my-6 h-px w-full"></div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <p className="text-lg">Colours:</p>
              <div className="flex items-center gap-2">
                <ProductColor colors={['#000', '#999']} />
              </div>
            </div>
            <div className="flex items-center gap-6">
              <p className="text-lg">Sizes:</p>
              <div className="flex items-center gap-4">
                {sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => handleSelectSize(s)}
                    disabled={product.sizes[s] <= 0}
                    className={twMerge(
                      'h-8 w-8 rounded border border-gray-600 disabled:cursor-not-allowed disabled:bg-gray-300/50',
                      selectedSize === s
                        ? 'bg-green-700 text-white'
                        : 'bg-white text-black',
                    )}
                  >
                    <p className="text-sm font-medium">{s.toUpperCase()}</p>
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <div>-</div>
                <p className="px-9 text-center">2</p>
                <div>+</div>
              </div>
              <Button variant="green" className="px-12">
                Buy Now
              </Button>
              <button>
                <Heart />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export async function getStaticPaths() {
  const products = await getProducts()
  const paths = products.map((p) => ({
    params: { id: p.id },
  }))

  return {
    paths,
    fallback: true,
  }
}

export async function getStaticProps({
  params,
}: GetStaticPropsContext<{ id: string }>): Promise<
  GetStaticPropsResult<ProductProps>
> {
  if (!params) {
    return {
      redirect: {
        destination: '/',
        permanent: true,
      },
    }
  }

  const product = await getProductById(params.id)

  return {
    props: { product },
  }
}
