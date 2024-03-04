'use client'

import AddressCard from './AddressCard'
import { useState, useEffect } from 'react'
import axios from 'axios'

// render list of AddressCard components
const AddressCardList = () => {
  const [addresses, setAddresses] = useState([
    {
      _id: 0,
      title: 'Home',
      description: '505 Independence Dr.',
    }
  ])

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        // make a GET request to backend server via axios
        const response = await axios.get('http://localhost:8080/api/addresses')

        // update the addresses state with the retrieved data
        setAddresses(response.data) 
      } catch (error) {
        console.error('Error fetching addresses:', error)
      }
    }

    fetchAddresses()
}, [])

  // Function to delete an address
  const deleteAddress = async (addressId) => {
      // Call API to delete address from the server...

      try {
        await axios.delete(
          `http://localhost:8080/api/addresses/${addressId}`,
        )

        // If successful, update state to remove the address
        setAddresses(addresses.filter(address => address._id !== addressId));
      } catch (error) {
        console.error('Error deleting address:', error)
      }
  };

    
  return (
    <div className="flex-1 max-w-3xl">
      {addresses.map((address) => (
        <AddressCard key={address._id} address={address} onDelete={deleteAddress}/>
      ))}
    </div>
  )
}

export default AddressCardList
