using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AttendenceManagementSystem.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AttendenceManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserInfoController : ControllerBase
    {
        private IUserInfoService _userInfoServices;
        public UserInfoController(IUserInfoService userInfoService)
        {
            _userInfoServices = userInfoService;
        }

        public IActionResult getUser()
        {
            return Ok(_userInfoServices.GetAllUser());
        }
    }
}