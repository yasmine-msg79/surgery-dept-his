const GetAllDoctorsSurgeries = async (did: string) => {
    try {
        const response = await fetch(`https://medica.runasp.net/api/Admin/DoctorSurgeries?did=${did}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export default GetAllDoctorsSurgeries;
