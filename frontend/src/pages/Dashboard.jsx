import React from 'react'

const Dashboard = () => {
  const budget = 60000;
  const spent = 56000;
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-green-100 rounded-xl">Budget: ₹{budget}</div>
        <div className="p-4 bg-red-100 rounded-xl">Spent: ₹{spent}</div>
        <div className="p-4 bg-blue-100 rounded-xl">
          Remaining: ₹{budget - spent}
        </div>
      </div>

      {spent > budget * 0.7 && (
        <p className="text-red-600 mt-4 font-semibold">
          ⚠ You are close to exceeding your budget!
        </p>
      )}
    </div>
  )
}

export default Dashboard
