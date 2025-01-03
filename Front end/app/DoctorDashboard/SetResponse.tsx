export const SetResponse = async (apid: number, res: boolean): Promise<any> => {
    try {
        const response = await fetch(`https://medica.runasp.net/api/Doctor/SetAppintmentResponse`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "apid": apid, "res": res })
        });  
        return response;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}
