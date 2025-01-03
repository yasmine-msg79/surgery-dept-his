using System.ComponentModel.DataAnnotations;

namespace DataBaseProject.Models
{
    public class DoctorInfo
    {
        [Key]
        public int DId { get; set; }
        
        public string Summary { get; set; } = string.Empty;

        public string Specialization { get; set; } = string.Empty;

        public string Education { get; set; } = string.Empty;

        public string Certification { get; set; } = string.Empty;

        public string privateclinical { get; set; } = string.Empty;
    }
}
