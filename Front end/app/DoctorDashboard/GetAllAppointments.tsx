const GetAllAppointments = async (did: number): Promise<any> => {
    try {
        const response = await fetch(`https://medica.runasp.net/api/Doctor/AllAppointments?did=${did}`);
        return response;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}
export default GetAllAppointments