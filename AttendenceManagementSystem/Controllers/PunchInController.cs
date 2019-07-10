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
    public class PunchInController : ControllerBase
    {
        private IUserInfoService _userInfoServices;
        public PunchInController(IUserInfoService userInfoService)
        {
            _userInfoServices = userInfoService;
        }
        [HttpPost]
        public IActionResult punchIn(PunchIn punchIn)
        {
            return Ok(_userInfoServices.punchIn(punchIn));
        }
        [HttpGet ("getData/{username}")]
        public IActionResult getPunchInData(string username)
        {
            return Ok(_userInfoServices.GetAllPunchInData(username));
        }

    }
}