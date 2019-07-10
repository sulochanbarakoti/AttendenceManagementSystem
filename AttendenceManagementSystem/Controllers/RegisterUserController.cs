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
    public class RegisterUserController : ControllerBase
    {
        private IUserInfoService _userInfoServices;
        public RegisterUserController(IUserInfoService userInfoService)
        {
            _userInfoServices = userInfoService;
        }
        [HttpPost]
        public IActionResult addUser(UserInfo userInfo)
        {
            return Ok(_userInfoServices.addUser(userInfo));
        }
    }
}