import React, { useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
import VehicleTable from './components/VehicleTable';
import Sidebar from './components/Sidebar';
import VehicleDetailsModal from './components/VehicleDetailsModal';

const App = () => {
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);

  const handleViewDetails = (vehicleId) => {
    setSelectedVehicleId(vehicleId);
    setDetailsModalOpen(true);
  };

  const handleCloseDetails = () => {
    setDetailsModalOpen(false);
    setSelectedVehicleId(null);
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <Box sx={{ flexGrow: 1, padding: 2 }}>
        <Typography variant="h4" align="center" style={{ margin: '20px 0' }}>
          Vehicle Management Dashboard
        </Typography>
        <VehicleTable onViewDetails={handleViewDetails} />
      </Box>

      {/* Vehicle Details Modal */}
      <VehicleDetailsModal
        open={detailsModalOpen}
        onClose={handleCloseDetails}
        vehicleId={selectedVehicleId}
      />
    </Box>
  );
};

export default App;
