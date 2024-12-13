import React, { useState, useEffect } from 'react';
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
  Box,
} from '@mui/material';
import { updateVehicle } from '../services/vehicleService'; // Assuming updateVehicle is your API call to update a vehicle

const EditVehicleModal = ({ open, onClose, vehicle, onVehicleUpdate }) => {
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
  
  const [isSubmitting, setIsSubmitting] = useState(false);
     console.log("this is form data"+JSON.stringify(formData))
  useEffect(() => {
    if (vehicle && vehicle._id) {  // Check if vehicle and _id are available
      setFormData({
        _id: vehicle._id,
        name: vehicle.name,
        status: vehicle.status,
        manufacturer: vehicle.manufacturer,
        price: vehicle.price,
        specifications: vehicle.specifications,
        features: vehicle.features,
        ownerDetails: vehicle.ownerDetails,
        location: vehicle.location,
      });
    }
  }, [vehicle]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [section, subfield] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [subfield]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      
      const vehicleId = formData._id; 
      console.log(vehicleId);
  
      if (!vehicleId) {
        throw new Error('Vehicle ID is missing');
      }
  
      // Update the vehicle via the API
      const updatedVehicle = await updateVehicle(vehicleId, formData); // Assuming this returns the updated vehicle data
      
      // If API response has the updated vehicle, update the state
      if (updatedVehicle) {
        onVehicleUpdate(updatedVehicle); // Pass the updated vehicle to the parent for state refresh
      } else {
        console.error('No updated vehicle returned from API');
      }
  
      onClose(); // Close the modal
    } catch (error) {
      console.error('Error updating vehicle:', error);
    } finally {
      setIsSubmitting(false); // Allow button to be clicked again after submission
    }
  };
  

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Vehicle</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Vehicle Name"
            fullWidth
            value={formData.name}
            onChange={handleChange}
            name="name"
          />
          <FormControl fullWidth>
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
          {/* Manufacturer Fields */}
          <TextField
            label="Manufacturer Name"
            fullWidth
            value={formData.manufacturer.name}
            onChange={handleChange}
            name="manufacturer.name"
          />
          <TextField
            label="Manufacturer Country"
            fullWidth
            value={formData.manufacturer.country}
            onChange={handleChange}
            name="manufacturer.country"
          />
          <TextField
            label="Manufacturer Established Year"
            fullWidth
            value={formData.manufacturer.establishedYear}
            onChange={handleChange}
            name="manufacturer.establishedYear"
          />
          {/* Price Fields */}
          <TextField
            label="Base Price"
            fullWidth
            type="number"
            value={formData.price.basePrice}
            onChange={handleChange}
            name="price.basePrice"
          />
          <TextField
            label="Currency"
            fullWidth
            value={formData.price.currency}
            onChange={handleChange}
            name="price.currency"
          />
          {/* Specifications Fields */}
          <TextField
            label="Engine"
            fullWidth
            value={formData.specifications.engine}
            onChange={handleChange}
            name="specifications.engine"
          />
          <TextField
            label="Fuel Type"
            fullWidth
            value={formData.specifications.fuelType}
            onChange={handleChange}
            name="specifications.fuelType"
          />
          {/* More fields for transmission, seatingCapacity, mileage, etc. */}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Cancel</Button>
        <Button onClick={handleSubmit} color="primary" disabled={isSubmitting}>
          {isSubmitting ? "Updating..." : "Update Vehicle"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditVehicleModal;
