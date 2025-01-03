const GetNurseSurgeries = async (nid: string) => {
    try {
        const response = await fetch(`https://medica.runasp.net/api/Admin/NurseSurgeries?nid=${nid}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export default GetNurseSurgeries;
