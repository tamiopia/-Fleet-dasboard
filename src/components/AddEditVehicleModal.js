import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import { addVehicle } from '../services/vehicleService'; // Assuming addVehicle is your API call to add a vehicle

const AddEditVehicleModal = ({ open, onClose, refreshVehicles }) => {
  const [formData, setFormData] = useState({
    name: '',
    status: 'Available', // Default value
    manufacturer: { name: '', country: '', establishedYear: '' },
    price: { basePrice: '', currency: 'USD' },
    specifications: {
      engine: '',
      fuelType: '',
      transmission: '',
      seatingCapacity: '',
      mileage: '',
    },
    features: [],
    ownerDetails: { name: '', contact: '', purchaseDate: '' },
    location: { city: '', state: '', country: '' },
  });

  const fuelTypes = ['Electric', 'Gasoline', 'Diesel', 'Hybrid']; // Enum for fuelType
  const transmissions = ['Automatic', 'Manual']; // Enum for transmission

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleManufacturerChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      manufacturer: {
        ...prev.manufacturer,
        [name]: value,
      },
    }));
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      price: {
        ...prev.price,
        [name]: value,
      },
    }));
  };

  const handleSpecificationsChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      specifications: {
        ...prev.specifications,
        [name]: value,
      },
    }));
  };

  const handleOwnerDetailsChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      ownerDetails: {
        ...prev.ownerDetails,
        [name]: value,
      },
    }));
  };

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        [name]: value,
      },
    }));
  };

  const handleFeaturesChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      features: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      // Ensure seatingCapacity is a number
      if (isNaN(formData.specifications.seatingCapacity)) {
        alert("Seating Capacity must be a number");
        return;
      }

      await addVehicle(formData); // Send the form data to the backend
      refreshVehicles(); // Refresh vehicle list after successful add
      onClose(); // Close the modal
    } catch (error) {
      console.error('Error adding vehicle:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Vehicle</DialogTitle>
      <DialogContent>
        <TextField
          label="Vehicle Name"
          fullWidth
          value={formData.name}
          onChange={handleChange}
          name="name"
          style={{ marginBottom: '20px' }} // Adding gap between inputs
        />
        <FormControl fullWidth style={{ marginBottom: '20px' }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={formData.status}
            onChange={handleChange}
            name="status"
          >
            <MenuItem value="Available">Available</MenuItem>
            <MenuItem value="Unavailable">Unavailable</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Manufacturer Name"
          fullWidth
          value={formData.manufacturer.name}
          onChange={handleManufacturerChange}
          name="name"
          style={{ marginBottom: '20px' }}
        />
        <TextField
          label="Manufacturer Country"
          fullWidth
          value={formData.manufacturer.country}
          onChange={handleManufacturerChange}
          name="country"
          style={{ marginBottom: '20px' }}
        />
        <TextField
          label="Manufacturer Established Year"
          fullWidth
          value={formData.manufacturer.establishedYear}
          onChange={handleManufacturerChange}
          name="establishedYear"
          style={{ marginBottom: '20px' }}
        />
        <TextField
          label="Base Price"
          fullWidth
          type="number"
          value={formData.price.basePrice}
          onChange={handlePriceChange}
          name="basePrice"
          style={{ marginBottom: '20px' }}
        />
        <TextField
          label="Currency"
          fullWidth
          value={formData.price.currency}
          onChange={handlePriceChange}
          name="currency"
          style={{ marginBottom: '20px' }}
        />
        <TextField
          label="Engine"
          fullWidth
          value={formData.specifications.engine}
          onChange={handleSpecificationsChange}
          name="engine"
          style={{ marginBottom: '20px' }}
        />
        <FormControl fullWidth style={{ marginBottom: '20px' }}>
          <InputLabel>Fuel Type</InputLabel>
          <Select
            value={formData.specifications.fuelType}
            onChange={handleSpecificationsChange}
            name="fuelType"
          >
            {fuelTypes.map((type, index) => (
              <MenuItem key={index} value={type}>{type}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth style={{ marginBottom: '20px' }}>
          <InputLabel>Transmission</InputLabel>
          <Select
            value={formData.specifications.transmission}
            onChange={handleSpecificationsChange}
            name="transmission"
          >
            {transmissions.map((type, index) => (
              <MenuItem key={index} value={type}>{type}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Seating Capacity"
          fullWidth
          type="number"
          value={formData.specifications.seatingCapacity}
          onChange={handleSpecificationsChange}
          name="seatingCapacity"
          style={{ marginBottom: '20px' }}
        />
        <TextField
          label="Mileage"
          fullWidth
          value={formData.specifications.mileage}
          onChange={handleSpecificationsChange}
          name="mileage"
          style={{ marginBottom: '20px' }}
        />
        <TextField
          label="Owner Name"
          fullWidth
          value={formData.ownerDetails.name}
          onChange={handleOwnerDetailsChange}
          name="name"
          style={{ marginBottom: '20px' }}
        />
        <TextField
          label="Owner Contact"
          fullWidth
          value={formData.ownerDetails.contact}
          onChange={handleOwnerDetailsChange}
          name="contact"
          style={{ marginBottom: '20px' }}
        />
        <TextField
          label="Purchase Date"
          fullWidth
          type="date"
          value={formData.ownerDetails.purchaseDate}
          onChange={handleOwnerDetailsChange}
          name="purchaseDate"
          style={{ marginBottom: '20px' }}
        />
        <TextField
          label="City"
          fullWidth
          value={formData.location.city}
          onChange={handleLocationChange}
          name="city"
          style={{ marginBottom: '20px' }}
        />
        <TextField
          label="State"
          fullWidth
          value={formData.location.state}
          onChange={handleLocationChange}
          name="state"
          style={{ marginBottom: '20px' }}
        />
        <TextField
          label="Country"
          fullWidth
          value={formData.location.country}
          onChange={handleLocationChange}
          name="country"
          style={{ marginBottom: '20px' }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">Cancel</Button>
        <Button onClick={handleSubmit} color="primary">Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEditVehicleModal;
