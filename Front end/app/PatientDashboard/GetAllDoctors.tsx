const GetAllDoctors = async (): Promise<any> => {
    try {
        const response = await fetch(`https://medica.runasp.net/api/Doctor/AllDoctors`);
        return response;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}
export default GetAllDoctors