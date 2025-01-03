const HandlePatientDiseases = async (diseasesData: any) => {
  const response = await fetch('https://medica.runasp.net/AddDisease', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(diseasesData),
  });

  console.log("HandlePatientDiseases response:", response);
  return response;
};

export default HandlePatientDiseases;
