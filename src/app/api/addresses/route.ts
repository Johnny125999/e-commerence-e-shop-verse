// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextRequest, NextResponse } from 'next/server'

import { MongoDbAddresses } from '@/lib/db/mongodb/addresses'
import { MongoDBUsers } from '@/lib/db/mongodb/users'
import { CustomAddress } from '@/lib/helpers/linkUserAddressDataWithAddressData'

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const ids = searchParams.getAll('ids[]')

  if (!ids.length) {
    return NextResponse.json({ addresses: [] })
  }

  const mongoDbAddressesClient = new MongoDbAddresses()
  const addresses = await mongoDbAddressesClient.getAddressesByIds(ids)

  return NextResponse.json(addresses ?? [])
}

export async function POST(req: Request) {
  const body: Omit<CustomAddress, 'id' | 'isDefault'> & { userId: string } =
    await req.json()
  const { city, number, street, zipCode, apartmentName, complement, userId } =
    body

  const mongoDbAddressesClient = new MongoDbAddresses()
  const addressId = await mongoDbAddressesClient.insertAddress({
    city,
    street,
    zipCode,
  })

  const mongoDbUsersClient = new MongoDBUsers()
  await mongoDbUsersClient.linkAddress(userId, {
    _id: addressId,
    number,
    apartmentName,
    complement,
  })

  return NextResponse.json({ id: addressId.toString() })
}

export async function PUT(req: Request) {
  const body: CustomAddress & { userId: string } = await req.json()
  const {
    city,
    number,
    street,
    zipCode,
    apartmentName,
    complement,
    userId,
    id: addressId,
    isDefault,
  } = body

  const mongoDbAddressesClient = new MongoDbAddresses()
  const newAddressId = await mongoDbAddressesClient.updateAddress({
    id: addressId,
    city,
    street,
    zipCode,
  })
  const mongoDbUsersClient = new MongoDBUsers()

  // Address didn't exist | Address updated
  if (newAddressId) {
    await mongoDbUsersClient.deleteAddress(userId, addressId)
    await mongoDbUsersClient.linkAddress(userId, {
      _id: newAddressId,
      number,
      apartmentName,
      complement,
    })
    if (isDefault) {
      mongoDbUsersClient.setDefaultAddress(userId, newAddressId.toString())
    }
  } else {
    await mongoDbUsersClient.updateAddress(userId, {
      _id: addressId,
      number,
      apartmentName,
      complement,
    })
  }

  return NextResponse.json(
    newAddressId ? { id: newAddressId.toString() } : null,
  )
}

export async function DELETE(req: Request) {
  const body: {
    userId: string
    addressId: string
    newDefault?: string
  } = await req.json()
  const { userId, addressId, newDefault } = body

  const mongoDbUsersClient = new MongoDBUsers()

  if (newDefault) {
    mongoDbUsersClient.setDefaultAddress(userId, newDefault)
  }

  await mongoDbUsersClient.deleteAddress(userId, addressId)

  return NextResponse.json(null)
}
