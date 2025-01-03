const GetCommonSurgeriesList = async (nid: string, did: string): Promise<any> => {
    const url = `https://medica.runasp.net/api/Admin/SurgeriesOfNurse&Doctor?nid=${nid}&did=${did}`;
    console.log(`Fetching common surgeries from URL: ${url}`);

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Data:', data);
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export default GetCommonSurgeriesList;