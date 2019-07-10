using AttendenceManagementSystem.Models;
using Dapper;
using Microsoft.EntityFrameworkCore.Internal;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace AttendenceManagementSystem.Services
{
    public interface IUserInfoService
    {
        List<UserInfo> GetAllUser();
        List<UserRole> GetAllRole();
        bool getAuth(UserInfo data);
        bool punchIn(PunchIn punchIn);
        bool punchOut(PunchOut punchOut);
        bool checkValid(valid name);
        List<PunchIn> GetAllPunchInData(string username);
        List<PunchOut> GetAllPunchOutData(string username);
        bool addUser(UserInfo userInfo);

    }
    public class UserInfoServices : IUserInfoService
    {
        string sqlQueryUserRole = "select * from UserRole";

        public List<UserRole> GetAllRole()
        {
            List<UserRole> lst = new List<UserRole>();
            using (var connection = new SqlConnection("Data Source=ITSME\\SQLEXPRESS;Initial Catalog=DbAttendence;Integrated Security=True"))
            {
                lst = connection.Query<UserRole>(sqlQueryUserRole).ToList();
            }
            return lst;
        }



        // get all user from database
        public List<UserInfo> GetAllUser()
        {
            string sqlQuery = "SELECT UserInfo.UserId, UserInfo.Name, UserInfo.Address,UserInfo.Email,UserInfo.gender,UserInfo.PhoneNumber, UserInfo.Username, UserRole.RoleType FROM UserInfo INNER JOIN UserRole ON UserInfo.RoleId = UserRole.RoleId";
            List<UserInfo> lst = new List<UserInfo>();
            using (var connection = new SqlConnection("Data Source=ITSME\\SQLEXPRESS;Initial Catalog=DbAttendence;Integrated Security=True"))
            {
                lst = connection.Query<UserInfo>(sqlQuery).ToList();
            }
            return lst;
        }



        //Authenticate the user for AuthController
        public bool getAuth(UserInfo data)
        {
            IEnumerable users;
            if (data != null)
            {
                using (var connection = new SqlConnection("Data Source=ITSME\\SQLEXPRESS;Initial Catalog=DbAttendence;Integrated Security=True"))
                {
                    users = connection.Query("select Username, Password from UserInfo where Username = @Username and Password = @Password", new { Username = data.Username, Password = data.Password });
                }
                if (users.Any())
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            else
            {
                return false;
            }
            //return false;
        }


        // populate PunchIn data in database
        public bool punchIn(PunchIn punchIn)
        {
            int count;
            IEnumerable punchIN;
            string insertcommand = (@"insert into PunchIn([Username],[Date],[Time],[Message],[Longitude],[Latitude]) values (@Username,@Date,@Time,@Message,@Longitude,@Latitude)");
            if(punchIn.Latitude!= null && punchIn.Latitude!= null)
            {
                using (var connection = new SqlConnection("Data Source=ITSME\\SQLEXPRESS;Initial Catalog=DbAttendence;Integrated Security=True"))
                {
                    punchIN = connection.Query("select Date from PunchIn where Username = @Username and Date = @Date", new { Username = punchIn.Username, Date = punchIn.Date });
                }
                if (punchIN.Any())
                {
                    return false;
                }
                else
                {
                    using (var connection = new SqlConnection("Data Source=ITSME\\SQLEXPRESS;Initial Catalog=DbAttendence;Integrated Security=True"))
                    {
                        count = connection.Execute(insertcommand, punchIn);
                    }
                    if (count > 0)
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }
            }
            else
            {
                return false;
            }
        }


        //populate PunchOut data in database
        public bool punchOut(PunchOut punchOut)
        {
            int count;
            IEnumerable punchOUT;

            string insertcommand = (@"insert into PunchOut([Username],[Date],[Time],[Message],[Longitude],[Latitude]) values (@Username,@Date,@Time,@Message,@Longitude,@Latitude)");
            if (punchOut.Latitude != null && punchOut.Latitude != null)
            {
                using (var connection = new SqlConnection("Data Source=ITSME\\SQLEXPRESS;Initial Catalog=DbAttendence;Integrated Security=True"))
                {
                    punchOUT = connection.Query("select Date from PunchOut where Username = @Username and Date = @Date", new { Username = punchOut.Username, Date = punchOut.Date });
                }
                if (punchOUT.Any())
                {
                    return false;
                }
                else
                {
                    using (var connection = new SqlConnection("Data Source=ITSME\\SQLEXPRESS;Initial Catalog=DbAttendence;Integrated Security=True"))
                    {
                        count = connection.Execute(insertcommand, punchOut);
                    }
                    if (count > 0)
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }
            }
            else
                return false;
        }


        //Get punchIn data from database
        public List<PunchIn> GetAllPunchInData(string username)
        {
            List<PunchIn> lst = new List<PunchIn>();
            using (var connection = new SqlConnection("Data Source=ITSME\\SQLEXPRESS;Initial Catalog=DbAttendence;Integrated Security=True"))
            {
                lst = connection.Query<PunchIn>("select * from PunchIn where Username = @username ", new { Username = username }).ToList();
            }
            return lst;
        }





        //Get punchOut data from database
        public List<PunchOut> GetAllPunchOutData(string username)
        {
            List<PunchOut> lst = new List<PunchOut>();
            using (var connection = new SqlConnection("Data Source=ITSME\\SQLEXPRESS;Initial Catalog=DbAttendence;Integrated Security=True"))
            {
                lst = connection.Query<PunchOut>("select * from PunchOut where Username = @username ", new { Username = username }).ToList();
            }
            return lst;
        }

        public bool checkValid(valid name)
        {
            if (name != null)
            {
                List<UserInfo> lst = new List<UserInfo>();
                using (var connection = new SqlConnection("Data Source=ITSME\\SQLEXPRESS;Initial Catalog=DbAttendence;Integrated Security=True"))
                {
                    lst = connection.Query<UserInfo>("SELECT UserInfo.UserId, UserInfo.Name,UserInfo.Email, UserInfo.Username, UserRole.RoleType FROM UserInfo INNER JOIN UserRole ON UserInfo.RoleId = UserRole.RoleId where Username=@name", new { name = name.name }).ToList();
                }
                if (lst[0].RoleType=="admin")
                {
                    return true;
                }
                else
                {
                    return false;
                }

            }
            else
                return false;
        }

        public bool addUser(UserInfo userInfo)
        {
            int count;
            string insertcommand = (@"insert into UserInfo([Username],[Name],[Address],[PhoneNumber],[Email],[Password],[RoleId]) values (@Username,@Name,@Address,@PhoneNumber,@Email,@Password,@RoleId)");
            using (var connection = new SqlConnection("Data Source=ITSME\\SQLEXPRESS;Initial Catalog=DbAttendence;Integrated Security=True"))
            {
                count = connection.Execute(insertcommand, userInfo);
            }
            if (count > 0)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}
