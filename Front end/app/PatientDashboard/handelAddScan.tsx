const handelAddScan = async (formData: any) => {
    const response = await fetch('https://medica.runasp.net/AddScan', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    return await response;
  };

 export default handelAddScan;