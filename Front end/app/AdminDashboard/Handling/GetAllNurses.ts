const GetAllNurses = async () => {
    try {
        const response = await fetch('https://medica.runasp.net/api/Nurse/AllNurses', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            console.log("Failed to fetch nurses");
            throw new Error(`Failed to fetch nurses: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Data fetched successfully:", data);
        return data;
    } catch (error) {
        console.error("Failed to fetch nurse:", error);
        throw error;
    }
};

export default GetAllNurses;
