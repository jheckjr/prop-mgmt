import React from 'react';

import './index.css';

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function PropertyCard(props) {
  // Pull property item from API
  const address = '123 Main St.';
  const tenantName = 'John Smith'; // default to "---" if returns empty
  const rentAmount = 500; // default to "---" if returns empty
  const rentDueDate = new Date(2019, 0, 1);
  const formattedRentDueDate = formatDate(rentDueDate); // default to "---" if invalid
  const leaseStartDate = new Date(2019, 0, 1);
  const leaseEndDate = new Date(2019, 11, 31);
  const leaseTerm = `${formatDate(leaseStartDate)} - ${formatDate(leaseEndDate)}`; // default to "---" if invalid
  const status = "Occupied"; // options should be occupied, vacant, expiring, ---
  return (
    <div className="property-card-container">
      <h4 className="property-card-address">{address}</h4>
      <h5 className="property-card-tenant-header">Tenant</h5>
      <span className="property-card-tenant-name">{tenantName}</span>
      <h5 className="property-card-rent-header">Rent</h5>
      <h5 className="property-card-date-header">Due Date</h5>
      <span className="property-card-rent">${rentAmount}</span>
      <span className="property-card-date">{formattedRentDueDate}</span>
      <h5 className="property-card-term-header">Lease Term</h5>
      <span className="property-card-term">{leaseTerm}</span>
      <h5 className="property-card-status-header">Status</h5>
      <span className="property-card-status">{status}</span>
    </div>
  );
}

function formatDate(date) {
  return `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}