import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import './property-card.css';

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
    <Container>
      <Row>
        <h4>{address}</h4>
      </Row>
      <Row>
        <h5>Tenant</h5>
      </Row>
      <Row>
        <span>{tenantName}</span>
      </Row>
      <Row>
        <Col><h5>Rent</h5></Col>
        <Col><h5>Due Date</h5></Col>
      </Row>
      <Row>
        <Col><span>${rentAmount}</span></Col>
        <Col><span>{formattedRentDueDate}</span></Col>
      </Row>
      <Row>
        <h5>Lease Term</h5>
      </Row>
      <Row>
        <span>{leaseTerm}</span>
      </Row>
      <Row>
        <h5>Status</h5>
      </Row>
      <Row>
        <span>{status}</span>
      </Row>
    </Container>
  );
}

function formatDate(date) {
  return `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getYear()}`;
}