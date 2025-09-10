import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import Papa from 'papaparse';
import { Trip, Report } from '../types';

export const exportTripsAsCSV = (trips: Trip[]): void => {
  const csvData = trips.map(trip => ({
    'Trip ID': trip.id,
    'Start Time': new Date(trip.startTime).toLocaleString(),
    'End Time': new Date(trip.endTime).toLocaleString(),
    'Origin': trip.origin.address || `${trip.origin.lat}, ${trip.origin.lng}`,
    'Destination': trip.destination.address || `${trip.destination.lat}, ${trip.destination.lng}`,
    'Distance (km)': (trip.distance / 1000).toFixed(2),
    'Duration (min)': Math.round(trip.duration / 60),
    'Mode': trip.mode,
    'Confidence': `${Math.round(trip.modeConfidence * 100)}%`,
    'Purpose': trip.purpose,
    'Co-travelers': trip.coTravelers,
    'Type': trip.isHousehold ? 'Household' : 'Solo'
  }));

  const csv = Papa.unparse(csvData);
  downloadFile(csv, 'trips-export.csv', 'text/csv');
};

export const exportTripsAsExcel = (trips: Trip[]): void => {
  const wsData = trips.map(trip => ({
    'Trip ID': trip.id,
    'Start Time': new Date(trip.startTime).toLocaleString(),
    'End Time': new Date(trip.endTime).toLocaleString(),
    'Origin': trip.origin.address || `${trip.origin.lat}, ${trip.origin.lng}`,
    'Destination': trip.destination.address || `${trip.destination.lat}, ${trip.destination.lng}`,
    'Distance (km)': Number((trip.distance / 1000).toFixed(2)),
    'Duration (min)': Math.round(trip.duration / 60),
    'Mode': trip.mode,
    'Confidence': `${Math.round(trip.modeConfidence * 100)}%`,
    'Purpose': trip.purpose,
    'Co-travelers': trip.coTravelers,
    'Type': trip.isHousehold ? 'Household' : 'Solo'
  }));

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(wsData);
  XLSX.utils.book_append_sheet(wb, ws, 'Trips');
  XLSX.writeFile(wb, 'trips-export.xlsx');
};

export const exportTripsAsPDF = (trips: Trip[], userFullName?: string): void => {
  const doc = new jsPDF();
  
  // Header with Kerala branding
  doc.setFontSize(20);
  doc.setTextColor(5, 150, 105); // Kerala green
  doc.text('God\'s Own Country', 20, 20);
  
  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  doc.text('NATPAC - Travel Data Report', 20, 35);
  
  if (userFullName) {
    doc.setFontSize(12);
    doc.text(`User: ${userFullName}`, 20, 45);
  }
  
  doc.text(`Generated: ${new Date().toLocaleDateString()}`, 20, 55);
  doc.text(`Total Trips: ${trips.length}`, 20, 65);
  
  // Add summary statistics
  const totalDistance = trips.reduce((sum, trip) => sum + trip.distance, 0);
  const totalDuration = trips.reduce((sum, trip) => sum + trip.duration, 0);
  const modeCount = trips.reduce((acc, trip) => {
    acc[trip.mode] = (acc[trip.mode] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  doc.text(`Total Distance: ${(totalDistance / 1000).toFixed(1)} km`, 120, 55);
  doc.text(`Total Duration: ${Math.round(totalDuration / 3600)} hours`, 120, 65);
  
  // Mode distribution
  let yPos = 85;
  doc.setFontSize(14);
  doc.text('Mode Distribution:', 20, yPos);
  yPos += 10;
  
  doc.setFontSize(10);
  Object.entries(modeCount).forEach(([mode, count]) => {
    const percentage = ((count / trips.length) * 100).toFixed(1);
    doc.text(`${mode}: ${count} trips (${percentage}%)`, 25, yPos);
    yPos += 8;
  });
  
  // AI-generated summary
  yPos += 10;
  doc.setFontSize(12);
  doc.text('AI Summary:', 20, yPos);
  yPos += 8;
  doc.setFontSize(10);
  const summary = generateTripSummary(trips);
  const summaryLines = doc.splitTextToSize(summary, 170);
  doc.text(summaryLines, 20, yPos);
  
  doc.save(`${userFullName ? userFullName.replace(' ', '_') + '_' : ''}trips_report.pdf`);
};

const generateTripSummary = (trips: Trip[]): string => {
  const totalTrips = trips.length;
  const avgDistance = trips.reduce((sum, trip) => sum + trip.distance, 0) / trips.length / 1000;
  const mostUsedMode = Object.entries(
    trips.reduce((acc, trip) => {
      acc[trip.mode] = (acc[trip.mode] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).sort(([,a], [,b]) => b - a)[0][0];
  
  const commonPurpose = Object.entries(
    trips.reduce((acc, trip) => {
      acc[trip.purpose] = (acc[trip.purpose] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).sort(([,a], [,b]) => b - a)[0][0];

  return `Analysis of ${totalTrips} trips shows an average travel distance of ${avgDistance.toFixed(1)} km per trip. ${mostUsedMode.charAt(0).toUpperCase() + mostUsedMode.slice(1)} is the most preferred mode of transport, accounting for the majority of journeys. Most trips are undertaken for ${commonPurpose.toLowerCase()} purposes, indicating regular travel patterns. The data suggests efficient mobility patterns within Kerala's transport network.`;
};

const downloadFile = (content: string, filename: string, contentType: string): void => {
  const blob = new Blob([content], { type: contentType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};