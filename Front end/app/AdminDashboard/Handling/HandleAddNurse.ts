const HandleAddNurse = async (nurse: any) => {
    const response = await fetch('https://medica.runasp.net/api/Admin/AddNurse', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(nurse),
    });
    return response;
};
export default HandleAddNurse;