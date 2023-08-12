import Link from 'next/link'

import Button from '@/components/buttons/Button'
import ListHeader from '@/components/lists/ListHeader'
import Product from '@/components/Product'

import { Product as ProductType } from '@/contexts/ProductsContext'

type ListProductsProps = {
  topic?: string
  products: ProductType[]
  title?: string
  hasTimer?: boolean
  hasViewAllButton?: boolean
  hasCartButton?: boolean
  filter?: string
}

export default function ListProducts({
  title,
  topic,
  hasTimer = false,
  hasViewAllButton = false,
  hasCartButton = false,
  products,
  filter,
}: ListProductsProps) {
  return (
    <div className="flex w-full flex-col gap-10">
      {topic && (
        <ListHeader
          topic={topic}
          title={title}
          hasTimer={hasTimer}
        ></ListHeader>
      )}
      <div className="grid w-full auto-cols-auto grid-flow-row auto-rows-auto grid-cols-1 content-center items-center gap-[1.875rem] sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((p) => (
          <Product
            key={p.id}
            id={p.id}
            imagePath={p.images[0]}
            price={p.price}
            hasButton={hasCartButton}
            discount={p.discount}
            numberOfStars={p.stars}
            numberOfEvaluations={p.evaluations}
            name={p.name}
          />
        ))}
      </div>
      {hasViewAllButton && (
        <Link
          href={{ pathname: '/products', query: filter && { filter } }}
          className="mx-auto"
        >
          <Button className="w-fit px-12 py-4" variant="green">
            View All Products
          </Button>
        </Link>
      )}
    </div>
  )
}
