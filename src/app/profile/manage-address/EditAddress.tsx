import { zodResolver } from '@hookform/resolvers/zod'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Trash2 } from 'react-feather'
import { useForm } from 'react-hook-form'

import { Address } from '@/lib/db/mongodb/addresses'

import Button from '@/components/buttons/Button'
import { zipCodeRegexp } from '@/components/RRFInput'

import {
  AddressForm,
  AddressFormInputs,
  addressFormSchema,
} from '@/app/profile/manage-address'
import { useLoading } from '@/contexts/LoadingProvider'

type ManageAddressProps = {
  setAddresses: Dispatch<SetStateAction<Address[]>>
  newDefault?: Address
  address: Address
  userId: string
  isDefault: boolean
  handleSetDefaultAddress: (
    address: Address,
    isCurrentDefault?: boolean,
  ) => void
}

export function EditAddress({
  setAddresses,
  newDefault,
  address,
  userId,
  handleSetDefaultAddress,
}: ManageAddressProps) {
  const { city, id, number, street, zipCode, apartmentName, complement } =
    address

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
    setFocus,
    setValue,
    trigger,
  } = useForm<AddressFormInputs>({
    resolver: zodResolver(addressFormSchema),
    defaultValues: {
      apartmentName,
      city,
      complement,
      number,
      street,
      zipCode: zipCode && zipCodeRegexp(zipCode),
    },
  })

  const { setLoading } = useLoading()
  const [isEditting, setIsEditting] = useState(false)

  useEffect(() => {
    if (errors.zipCode) {
      setFocus('zipCode')
    }
  }, [errors, setFocus])

  function handleCancelEdit() {
    reset()

    setIsEditting(false)
  }

  async function handleEditAddress(data: AddressFormInputs) {
    setLoading(true)
    const hasEditedFields = Object.entries(data).some(([key, val]) => {
      return address[key as keyof AddressFormInputs] !== val
    })

    if (hasEditedFields) {
      await fetch('/api/addresses', {
        method: 'PUT',
        body: JSON.stringify({
          ...data,
          id: address.id,
        }),
      }).then((res) =>
        res.json().catch((err) => {
          throw new Error(err)
        }),
      )

      const newAddress: Address = {
        ...data,
        id: address.id,
      }

      setAddresses((addresses) =>
        addresses.map((a) => (a.id !== address.id ? a : newAddress)),
      )
      setIsEditting(false)
    } else {
      alert('Please edit some field before proceed')
    }
    setLoading(false)
  }

  async function handleDeleteAddress() {
    setLoading(true)
    await fetch('/api/addresses', {
      method: 'DELETE',
      body: JSON.stringify({
        userId,
        addressId: address.id,
        newDefault: newDefault?.id,
      }),
    }).then((res) => res.json())

    if (newDefault) {
      handleSetDefaultAddress(newDefault, true)
    } else {
      setAddresses((addresses) => addresses.filter((a) => a.id !== address.id))
    }

    setLoading(false)
  }

  return (
    <div className="space-y-2">
      <AddressForm
        errors={errors}
        handleSubmit={handleEditAddress}
        handleSubmitWrapper={handleSubmit}
        register={register}
        setValue={setValue}
        trigger={trigger}
        id={id}
        isEditting={isEditting}
      />
      {isEditting ? (
        <div className="flex flex-wrap items-center gap-4">
          <p className="font-medium">Confirm Changes?</p>
          <div className="flex items-center gap-2">
            <Button
              disabled={isSubmitting}
              onClick={handleCancelEdit}
              variant="light"
            >
              Cancel
            </Button>
            <Button
              disabled={isSubmitting}
              form={`form${id}`}
              type="submit"
              variant="green"
            >
              Yes
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <Button onClick={() => setIsEditting(true)} variant="green">
            Edit
          </Button>
          <div
            onClick={handleDeleteAddress}
            className="cursor-pointer rounded bg-white p-2 text-red-700 transition-all hover:bg-gray-100"
          >
            <Trash2 />
          </div>
        </div>
      )}
    </div>
  )
}
