const GetDoctor = async (did: string) => {
    try {
        const response = await fetch(`https://medica.runasp.net/api/Doctor/Doctor?did=${did}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export default GetDoctor;
