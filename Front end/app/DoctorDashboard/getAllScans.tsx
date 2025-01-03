const GetAllScans = async (did: number): Promise<any> => {
    try {
        const response = await fetch(`https://medica.runasp.net/api/Doctor/AllScans?did=${did}`);
        return response;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}
export default GetAllScans;