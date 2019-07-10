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
    public class IsValidController : ControllerBase
    {
        private IUserInfoService _userInfoServices;
        public IsValidController(IUserInfoService userInfoService)
        {
            _userInfoServices = userInfoService;
        }
        [HttpPost]
        public IActionResult isValid(valid name)
        {
            return Ok(_userInfoServices.checkValid(name));
        }
    }
}