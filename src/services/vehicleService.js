import axios from 'axios';

const API_URL = 'http://localhost:5000/api/vehicles'; // Update with your backend URL

export const getVehicles = async () => axios.get(API_URL);

export const getVehicleById = async (id) => axios.get(`${API_URL}/${id}`);

export const addVehicle = async (vehicle) => axios.post(API_URL, vehicle);

export const updateVehicle = async (id, vehicle) => axios.put(`${API_URL}/${id}`, vehicle);

export const deleteVehicle = async (id) => axios.delete(`${API_URL}/${id}`);
