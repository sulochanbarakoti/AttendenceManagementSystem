using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AttendenceManagementSystem.Models;
using AttendenceManagementSystem.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AttendenceManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PunchOutController : ControllerBase
    {
        private IUserInfoService _userInfoServices;
        public PunchOutController(IUserInfoService userInfoService)
        {
            _userInfoServices = userInfoService;
        }
        [HttpPost]
        public IActionResult punchOut(PunchOut punchOut)
        {
            return Ok(_userInfoServices.punchOut(punchOut));
        }
        [HttpGet("getData/{username}")]
        public IActionResult getPunchOutData(string username)
        {
            return Ok(_userInfoServices.GetAllPunchOutData(username));
        }
    }
}