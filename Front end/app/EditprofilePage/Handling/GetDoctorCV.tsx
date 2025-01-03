const GetDoctorCV = async (did: any): Promise<any> => {
    const url = `https://medica.runasp.net/api/Doctor/GetDoctorCV?did=${did}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Doctor CV:', data);
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export default GetDoctorCV;