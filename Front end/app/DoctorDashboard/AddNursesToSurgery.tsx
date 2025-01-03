const addToSurgery = async (formData: any) => {
    const response = await fetch('https://medica.runasp.net/api/Nurse/addToSurgery', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    return await response;
  };

 export default addToSurgery;