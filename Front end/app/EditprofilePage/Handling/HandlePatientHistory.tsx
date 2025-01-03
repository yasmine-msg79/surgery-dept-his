const HandlePatientHistory = async (patientHistoryData: any) => {
  const response = await fetch('https://medica.runasp.net/AddPhistory', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(patientHistoryData),
  });

  console.log("HandlePatientHistory response:", response);
  return response;
};

export default HandlePatientHistory;
