'use client'

import { useState, useEffect } from 'react'

type InventoryItem = {
  id: number
  name: string
  quantity: number
  expirationDate: string
  lowStock: boolean
}

const mockInventory: InventoryItem[] = [
  { id: 1, name: 'Surgical Masks', quantity: 500, expirationDate: '2024-12-31', lowStock: false },
  { id: 2, name: 'Disposable Gloves', quantity: 200, expirationDate: '2024-06-30', lowStock: true },
  { id: 3, name: 'Hand Sanitizer', quantity: 50, expirationDate: '2023-12-31', lowStock: false },
  { id: 4, name: 'Syringes', quantity: 1000, expirationDate: '2025-03-31', lowStock: false },
  { id: 5, name: 'Bandages', quantity: 300, expirationDate: '2024-09-30', lowStock: false },
]

export default function InventoryTracking() {
  const [inventory, setInventory] = useState<InventoryItem[]>(mockInventory)
  const [newItem, setNewItem] = useState({ name: '', quantity: 0, expirationDate: '' })

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setInventory(prevInventory =>
        prevInventory.map(item => ({
          ...item,
          quantity: Math.max(0, item.quantity - Math.floor(Math.random() * 3)),
          lowStock: item.quantity < 100
        }))
      )
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault()
    setInventory(prevInventory => [
      ...prevInventory,
      {
        id: prevInventory.length + 1,
        ...newItem,
        lowStock: newItem.quantity < 100
      }
    ])
    setNewItem({ name: '', quantity: 0, expirationDate: '' })
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Automated Inventory Tracking</h1>
      <form onSubmit={handleAddItem} className="mb-4">
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Item Name"
            value={newItem.name}
            onChange={e => setNewItem({ ...newItem, name: e.target.value })}
            className="flex-grow px-2 py-1 border rounded"
          />
          <input
            type="number"
            placeholder="Quantity"
            value={newItem.quantity}
            onChange={e => setNewItem({ ...newItem, quantity: parseInt(e.target.value) })}
            className="w-24 px-2 py-1 border rounded"
          />
          <input
            type="date"
            value={newItem.expirationDate}
            onChange={e => setNewItem({ ...newItem, expirationDate: e.target.value })}
            className="px-2 py-1 border rounded"
          />
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
            Add Item
          </button>
        </div>
      </form>
      <table className="w-full">
        <thead>
          <tr className="bg-black-700">
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Quantity</th>
            <th className="p-2 text-left">Expiration Date</th>
            <th className="p-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map(item => (
            <tr key={item.id} className={item.lowStock ? 'bg-red-800' : ''}>
              <td className="p-2">{item.name}</td>
              <td className="p-2">{item.quantity}</td>
              <td className="p-2">{item.expirationDate}</td>
              <td className="p-2">{item.lowStock ? 'Low Stock' : 'In Stock'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

