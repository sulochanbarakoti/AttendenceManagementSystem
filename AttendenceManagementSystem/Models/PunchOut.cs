using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AttendenceManagementSystem.Models
{
    public class PunchOut
    {
        public int PunchOutId { get; set; }
        public string Username { get; set; }
        public string Message { get; set; }
        public string Date { get; set; }
        public string Time { get; set; }
        public string Longitude { get; set; }
        public string Latitude { get; set; }
        public int UserId { get; set; }
    }
}
