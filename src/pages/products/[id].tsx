import { randomUUID } from 'crypto'
import { motion } from 'framer-motion'
import {
  GetStaticProps,
  GetStaticPropsContext,
  GetStaticPropsResult,
  InferGetStaticPropsType,
} from 'next'
import { useState } from 'react'
import { Heart, RefreshCcw } from 'react-feather'
import { TbTruckDelivery } from 'react-icons/tb'
import { twMerge } from 'tailwind-merge'

import { getProductById, getProducts } from '@/lib/http'

import Button from '@/components/buttons/Button'
import ImagesSwitch from '@/components/ImagesSwitch'
import ListProducts from '@/components/lists/ListProducts'
import { ProductColors } from '@/components/ProductColors'
import Stars from '@/components/Stars'
import Steps from '@/components/Steps'

import { Product } from '@/contexts/ProductsContext'

export type ImageType = {
  id: string
  image: string
}

type ProductProps = {
  product: Product
  images: ImageType[]
  relatedProducts: Product[]
  key: string
}

export default function Product({
  product,
  relatedProducts,
  images: productImages,
}: InferGetStaticPropsType<GetStaticProps<ProductProps>>) {
  const [selectedSize, setSelectedSize] = useState<null | string>(null)

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
      <div
        className={twMerge(
          'flex w-full gap-[68px]',
          relatedProducts.length && 'mb-[8.75rem]',
        )}
      >
        <div className="grid max-h-[37.5rem] w-full max-w-[43.875rem] grid-cols-[10.625rem_31.25rem] gap-8">
          <ImagesSwitch productImages={productImages} />
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
          <div className="my-6 h-px w-full bg-gray-600"></div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <p className="text-lg">Colours:</p>
              <div className="flex items-center gap-2">
                <ProductColors colors={['#000', '#999']} />
              </div>
            </div>
            <div className="flex items-center gap-6">
              <p className="text-lg">Sizes:</p>
              <div className="flex items-center gap-4">
                {sizes.map((s) => (
                  <motion.button
                    key={s}
                    onClick={() => handleSelectSize(s)}
                    disabled={product.sizes[s] <= 0}
                    className={twMerge(
                      'h-8 w-8 rounded border bg-white disabled:cursor-not-allowed disabled:bg-gray-300/50',
                      selectedSize === s
                        ? 'border-green-700'
                        : 'border-gray-600',
                    )}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {selectedSize === s ? (
                      <motion.div
                        layoutId="selectedSize"
                        className="flex h-full w-full items-center justify-center rounded-sm bg-green-700 text-white"
                      >
                        <p className="text-sm font-medium">{s.toUpperCase()}</p>
                      </motion.div>
                    ) : (
                      <p className="text-sm font-medium">{s.toUpperCase()}</p>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-6 flex max-h-[2.75rem] items-center gap-4">
            <div className="flex h-full items-center overflow-hidden rounded bg-white">
              <Button
                variant="ghost"
                className="h-full rounded-r-none border border-gray-600 text-2xl hover:bg-gray-200"
              >
                -
              </Button>
              <div className="h-full border-x-0 border-y border-gray-600 px-9 py-[.375rem] text-center leading-6">
                {product.quantity}
              </div>
              <Button
                variant="green"
                className="h-full rounded-l-none border border-l-0  border-green-600 text-2xl"
              >
                +
              </Button>
            </div>
            <Button variant="green" className="h-full px-12">
              Buy Now
            </Button>
            <div className="flex items-center justify-center rounded border border-gray-600 p-[.375rem]">
              <Heart width={20} height={20} strokeWidth={1.5} />
            </div>
          </div>
          <div className="mt-11">
            <div className="flex w-full gap-4 rounded rounded-b-none border border-b-0 border-gray-600 px-4 py-6">
              <TbTruckDelivery className="h-10 w-10" strokeWidth={1.5} />
              <div className="space-y-2">
                <p className="font-medium">Free delivery</p>
                <p className="text-xs font-medium">
                  Enter your postal code for Delivery Availability
                </p>
              </div>
            </div>
            <div className="flex w-full gap-4 rounded rounded-t-none border border-gray-600 px-4 py-6">
              <RefreshCcw width={40} height={40} strokeWidth={1.5} />
              <div className="space-y-2">
                <p className="font-medium">Return Delivery</p>
                <p className="text-xs font-medium">
                  Free 30 Days Delivery Returns. Details
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {relatedProducts.length > 0 && (
        <ListProducts products={relatedProducts} topic="Related Items" />
      )}
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

  const images = product.images.map((pi) => ({
    id: randomUUID(),
    image: pi,
  }))
  const relatedProducts = await getProducts({
    limit: 4,
    category: product.category,
  })

  return {
    props: { product, relatedProducts, images, key: params.id },
  }
}
