using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AttendenceManagementSystem.Models;
using AttendenceManagementSystem.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace AttendenceManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private IUserInfoService _userInfoServices;
        public AuthController(IUserInfoService userInfoServices)
        {
            _userInfoServices = userInfoServices;
        }
        [HttpPost]
        public IActionResult Login([FromBody]UserInfo data)
        {
            List<UserInfo> lst = new List<UserInfo>();
            if (data == null)
            {
                return BadRequest("Invalid client request");
            }
            //data.Username == "upen" && data.Password == "upen"
            
            if (_userInfoServices.getAuth(data))
            {
                var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("superSuperSecretKey@12321"));
                var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

                var tokeOptions = new JwtSecurityToken(
                    issuer: "http://localhost:44355",
                    audience: "http://localhost:44355",
                    claims: new List<Claim>(),
                    expires: DateTime.Now.AddMinutes(60),
                    signingCredentials: signinCredentials
                );

                var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
                return Ok(new { Token = tokenString });
            }
            else
            {
                return Unauthorized();
            }
        }
    }
}