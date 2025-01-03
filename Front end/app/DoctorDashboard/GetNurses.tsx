const GetNurses = async (): Promise<any> => {
    try {
        const response = await fetch(`https://medica.runasp.net/api/Nurse/AllNurses`);
        return response;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}
export default GetNurses