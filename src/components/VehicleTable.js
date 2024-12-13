import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  TextField,
  TableSortLabel,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { getVehicles, deleteVehicle } from '../services/vehicleService';
import AddEditVehicleModal from './AddEditVehicleModal';
import EditVehicleModal from './EditVehicleModal';
import DeleteConfirmationDialog from './DeleteConfirmationDialog';
import VehicleDetailsModal from './VehicleDetailsModal';

const VehicleTable = () => {
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });

  const [openModal, setOpenModal] = useState(false);
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [vehicleToDelete, setVehicleToDelete] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);

  useEffect(() => {
    fetchVehicles();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [searchQuery, vehicles, sortConfig]);

  const fetchVehicles = async () => {
    try {
      const response = await getVehicles();
      setVehicles(response.data);
    } catch (error) {
      console.error('Failed to fetch vehicles', error);
    }
  };

  const applyFilters = () => {
    let filtered = vehicles;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (v) =>
          v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          v.status.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

    setFilteredVehicles(filtered);
  };
  const onDeleteVehicle = (vehicle) => {
    setVehicleToDelete(vehicle);
    setOpenDeleteDialog(true);
  };
   const onViewDetails = (vehicleId) => {
    const vehicle = vehicles.find((v) => v._id === vehicleId);
    setSelectedVehicle(vehicle);  // Set the vehicle object
    setOpenDetailsModal(true);    // Open the modal
  };

  const onEditVehicle = (vehicle) => {
    setSelectedVehicle(vehicle); 
    setOpenEditModal(true); 
  };
  const handleSort = (key) => {
    setSortConfig((prevConfig) => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const handleDelete = async () => {
    try {
      await deleteVehicle(vehicleToDelete._id);
      setVehicles(vehicles.filter((v) => v._id !== vehicleToDelete._id));
      setOpenDeleteDialog(false);
    } catch (error) {
      console.error('Failed to delete vehicle', error);
    }
  };

  return (
    <div>
      {/* Search and Add Button */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
  <TextField
    label={<span style={{ fontSize: '0.8rem' }}>Search Vehicles</span>} // Smaller label
    variant="outlined"
    size="small"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    style={{ flex: 1, marginRight: '40%', marginLeft:'10%' }}
  />
  <Button variant="contained" color="primary" onClick={() => setOpenModal(true)}>
    Add Vehicle
  </Button>
</div>


      {/* Vehicle Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.key === 'name'}
                  direction={sortConfig.key === 'name' ? sortConfig.direction : 'asc'}
                  onClick={() => handleSort('name')}
                >
                  Vehicle Name
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.key === 'status'}
                  direction={sortConfig.key === 'status' ? sortConfig.direction : 'asc'}
                  onClick={() => handleSort('status')}
                >
                  Status
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.key === 'updatedAt'}
                  direction={sortConfig.key === 'updatedAt' ? sortConfig.direction : 'asc'}
                  onClick={() => handleSort('updatedAt')}
                >
                  Last Updated
                </TableSortLabel>
              </TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredVehicles.length > 0 ? (
              filteredVehicles.map((vehicle) => (
                <TableRow key={vehicle._id}>
                  <TableCell>{vehicle.name}</TableCell>
                  <TableCell>{vehicle.status}</TableCell>
                  <TableCell>{new Date(vehicle.updatedAt).toLocaleString()}</TableCell>
                  <TableCell>
                    <IconButton color="info" onClick={() => onViewDetails(vehicle._id)}>
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton color="primary" onClick={() => onEditVehicle(vehicle)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="secondary" onClick={() => onDeleteVehicle(vehicle)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No vehicles found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modals and Dialogs */}
      {openModal && (
        <AddEditVehicleModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          vehicle={selectedVehicle}
          refreshVehicles={fetchVehicles}
        />
      )}

      {openEditModal && selectedVehicle && (
        <EditVehicleModal
          open={openEditModal}
          onClose={() => setOpenEditModal(false)}
          vehicle={selectedVehicle}
          onVehicleUpdate={fetchVehicles}
        />
      )}

      {openDetailsModal && selectedVehicle && (
        <VehicleDetailsModal
          open={openDetailsModal}
          onClose={() => setOpenDetailsModal(false)}
          vehicle={selectedVehicle}
        />
      )}

      {openDeleteDialog && (
        <DeleteConfirmationDialog
          open={openDeleteDialog}
          onClose={() => setOpenDeleteDialog(false)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
};

export default VehicleTable;
