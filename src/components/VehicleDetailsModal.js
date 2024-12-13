import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';

const VehicleDetailsModal = ({ open, onClose, vehicle }) => {
  // Ensure that the vehicle object is not null or undefined
  if (!vehicle) return null;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Vehicle Details</DialogTitle>
      <DialogContent>
        {/* Access individual properties of the vehicle object */}
        <p><strong>Name:</strong> {vehicle.name}</p>
        <p><strong>Status:</strong> {vehicle.status}</p>
        <p><strong>Manufacturer:</strong> {vehicle.manufacturer.name}</p>
        <p><strong>Country:</strong> {vehicle.manufacturer.country}</p>
        <p><strong>Established Year:</strong> {vehicle.manufacturer.establishedYear}</p>
        <p><strong>Price:</strong> {vehicle.price.basePrice} {vehicle.price.currency}</p>
        <p><strong>Engine:</strong> {vehicle.specifications.engine}</p>
        <p><strong>Fuel Type:</strong> {vehicle.specifications.fuelType}</p>
        <p><strong>Transmission:</strong> {vehicle.specifications.transmission}</p>
        <p><strong>Seating Capacity:</strong> {vehicle.specifications.seatingCapacity}</p>
        <p><strong>Mileage:</strong> {vehicle.specifications.mileage}</p>
        <p><strong>Owner:</strong> {vehicle.ownerDetails.name}</p>
        <p><strong>Owner Contact:</strong> {vehicle.ownerDetails.contact}</p>
        <p><strong>Purchase Date:</strong> {new Date(vehicle.ownerDetails.purchaseDate).toLocaleDateString()}</p>
        <p><strong>Location:</strong> {vehicle.location.city}, {vehicle.location.state}, {vehicle.location.country}</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default VehicleDetailsModal;
