using DataBaseProject.Data;
using DataBaseProject.Models;
using DataBaseProject.Services.Classes;
using DataBaseProject.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Rewrite;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

using static System.Net.Mime.MediaTypeNames;

namespace DataBaseProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DoctorController : ControllerBase
    {
        private readonly IUserService _user;
        private readonly IAccountService _account;
        private readonly IDoctorService _doctor;
        private readonly AppDbContext _db;
        public DoctorController(IAccountService account, IUserService user, IDoctorService doctor ,AppDbContext db)
        {
            _account = account;
            _user = user;
            _doctor = doctor;
            _db = db;

        }
        // get all doctors

        [HttpGet ("AllDoctors")]
        public IActionResult GetAllDoctors()
        {
            var result = _doctor.GetAllDocotrs();
            if (result != null)
            {
                return Ok(result);
            }
            else
            {
                return BadRequest("No Doctors found");
            }
        }

        // get doctor by id
        [HttpGet("Doctor")]     
        public IActionResult GetDoctor(int did)
        {

            var result = _doctor.GetDoctor(did);
            if (result != null)
            {
                return Ok(result);
            }
            else
            {
                return BadRequest("Doctor not found");
            }
        }

        // delete doctor
        [HttpDelete("DeleteDoctor")]   
        public IActionResult DeleteDoctor(int did)
        {
            var result = _doctor.DeleteDoctor(did);
            if (result != null)
            {
                return Ok(result);
            }
            else
            {
                return BadRequest("Doctor not found");
            }
        }

        // get all surgeries
       
        [HttpGet("AllSurgeries")]
        public IActionResult GetAllSurgeries(int did)
        {
            try
            {
                var result = _doctor.GetAllSurgeries(did);
                if (result != null && result.Count > 0)
                {
                    return Ok(result);
                }
                else
                {
                    return BadRequest("No Surgeries found");
                }
            }
            catch (Exception ex)
            {
                // Log the exception (assuming a logger is configured)
                Console.WriteLine($"Error in GetAllSurgeries endpoint for doctor ID {did}: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

        // get all appointments
        [HttpGet("AllAppointments")]
        public IActionResult GetAllAppointments(int did)
        {
            var result = _doctor.GetAllAppointments(did);
            if (result != null && result.Count > 0)
            {
                return Ok(result);
            }
            else
            {
                return BadRequest("No Appointments found");
            }
        }

        // get all scans
        [HttpGet("AllScans")]
        public IActionResult GetAllScans(int did)
        {
            var result = _doctor.GetAllScans(did);
            if (result != null && result.Count > 0)
            {
                return Ok(result);
            }
            else
            {
                return BadRequest("No Scans found");
            }
        }

        // get all activities
        [HttpGet("AllActivities")] 
        public IActionResult GetAllActivities(int did)
        {
            var result = _doctor.GetAllActivities(did);
            if (result != null && result.Count > 0)
            {
                return Ok(result);
            }
            else
            {
                return BadRequest("No Activities found");
            }

        }

        // set scan response
        [HttpPut("SetScanResponse")]
        public IActionResult SetScanResponse(int sid, bool accept,string response = null)
        {
            try
            {
                _doctor.SetScanResponse(sid,   accept,response);
                return Ok("Response set");
            }
            catch (ArgumentException ex)
            {
                // Handle the case where the provided ID does not exist
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                // Handle other exceptions
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }
        public record Response(int apid,bool res);
        // set appointment response
        [HttpPut("SetAppintmentResponse")]
        public IActionResult SetAppointmentResponse(Response response)
        {
            try
            {
                _doctor.SetAppointmentResponse(response.apid, response.res,null);
                return Ok("Response set");
            }
            catch (ArgumentException ex)
            {
                // Handle the case where the provided ID does not exist
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                // Handle other exceptions
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        [HttpPost("AddSurgery")]
        public IActionResult AddSurgery([FromBody] Surgery surgery)
        {
            try
            {
                _doctor.AddSurgery(surgery);
                return Ok("Surgery added successfully");
            }
            catch (Exception ex)
            {
                // Log the exception (assuming a logger is configured)
                Console.WriteLine($"Error in AddSurgery endpoint: {ex.Message}");
                return StatusCode(500, $"Error in AddSurgery endpoint: {ex.Message}");
            }
        }

        public record Note(int apid , string note); 
        [HttpPut("AddNotes")]
		public IActionResult AddNotes(Note note)
		{
			try
			{
                var ap = _db.Appointments.FirstOrDefault(x => x.Apid == note.apid);
                ap.notes = note.note;
                _db.Appointments.Update(ap);
				_db.SaveChanges();
				return Ok("Notes added successfully");
			}
			catch (ArgumentException ex)
			{
				// Handle the case where the provided ID does not exist
				return NotFound(ex.Message);
			}
			catch (Exception ex)
			{
				// Handle other exceptions
				return StatusCode(500, $"An error occurred: {ex.Message}");
			}
		}


        [HttpPost("SetDoctorCV")]
        public IActionResult SetDoctorCV(DoctorInfo info)
        {
            var Info = _db.DoctorInfos.FirstOrDefault(x => x.DId == info.DId);
            if(Info == null)
            {
                _db.DoctorInfos.Add(info);
            }
            else
            {
                Info.Certification = info.Certification;
                Info.Education = info.Education;
                Info.Specialization = info.Specialization;
                Info.Summary = info.Summary;
                Info.privateclinical = info.privateclinical;
                _db.DoctorInfos.Update(Info);
            }
            _db.SaveChanges();
            return Ok();
        }
        [HttpGet("GetDoctorCV")]
        public IActionResult GetDoctorCV([FromQuery] int did)
        {
            var Info = _db.DoctorInfos.FirstOrDefault(x => x.DId == did);
            if (Info == null)
            {
                return BadRequest("Doctor not found");
            }
            return Ok(Info);
        }
    }
}



