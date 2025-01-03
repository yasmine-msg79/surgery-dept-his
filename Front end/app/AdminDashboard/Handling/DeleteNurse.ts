
export default async function deleteNurse(nurseId: string): Promise<any> {
    try {
      const response = await fetch(`https://medica.runasp.net/api/Nurse/DeleteNurse?nid=${nurseId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        return { success: true };
      } else {
        const errorData = await response.json();
        throw new Error(`Failed to delete nurse: ${errorData.message}`);
      }
    } catch (error: any) {
      console.error('Error deleting nurse:', error);
      return { success: false, message: error.message };
    }
  }
  