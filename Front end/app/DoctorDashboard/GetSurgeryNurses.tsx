const GetSurgeryNurses = async (sid: number): Promise<any> => {
    try {
        const response = await fetch(`https://medica.runasp.net/api/Nurse/SurgeryNurses?sid=${sid}`);
        return response;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}
export default GetSurgeryNurses