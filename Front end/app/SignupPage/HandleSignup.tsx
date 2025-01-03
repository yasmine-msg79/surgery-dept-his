const HandleSignup = async (formData: any) => {
    const response = await fetch('https://medica.runasp.net/api/Profile/CreateAccount', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    console.log("from handling",formData)
    return await response;
  };

 export default HandleSignup;