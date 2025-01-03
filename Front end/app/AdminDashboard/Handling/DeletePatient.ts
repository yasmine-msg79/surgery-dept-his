
export default async function deletePatient(patientId: string): Promise<any> {
    try {
      const response = await fetch(`https://medica.runasp.net/DeletePatient?uid=${patientId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        return { success: true };
      } else {
        const errorData = await response.json();
        throw new Error(`Failed to delete patient: ${errorData.message}`);
      }
    } catch (error: any) {
      console.error('Error deleting patient:', error);
      return { success: false, message: error.message };
    }
  }
  