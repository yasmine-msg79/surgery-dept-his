const handelAddSurgery = async (formData: any) => {
    const response = await fetch('https://medica.runasp.net/api/Admin/addSurgery', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    return await response;
  };

 export default handelAddSurgery;