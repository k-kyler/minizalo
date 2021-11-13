using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using minizalo.Dtos;
using minizalo.Entities;
using minizalo.Helpers;
using minizalo.Repositories;

namespace minizalo.Controllers
{
    [ApiController] 
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly JwtService _jwtService;

        public AuthController(IUserRepository userRepository, JwtService jwtService)
        {
            _userRepository = userRepository;
            _jwtService = jwtService;
        }
        
        // Endpoint to register a new user account
        [HttpPost("register")]
        public async Task<ActionResult> Register(RegisterDto registerDto)
        {
            User existingUser = await _userRepository.GetUserByEmail(registerDto.Email);

            if (existingUser != null) 
            {
                return Ok(new { code = "error", message = "Email has been taken" });
            }

            User user = new()
            {
                UserId = Guid.NewGuid(),
                UserName = registerDto.UserName,
                Email = registerDto.Email,
                Password = BCrypt.Net.BCrypt.HashPassword(registerDto.Password),
                CreatedAt = registerDto.CreatedAt
            };
            
            await _userRepository.CreateUser(user);

            return Ok(new { code = "success", user });
        }
        
        // Endpoint to login authentication
        [HttpPost("login")]
        public async Task<ActionResult> Login(LoginDto loginDto)
        {
            User user = await _userRepository.GetUserByEmail(loginDto.Email);

            if (user is null || !BCrypt.Net.BCrypt.Verify(loginDto.Password, user.Password))
            {
                return Ok(new { code = "error", message = "Wrong email or password" });
            }

            var authJWT = _jwtService.GenerateJWT(user.UserId.ToString());
            
            Response.Cookies.Append("AuthJWT", authJWT, new CookieOptions() { 
                HttpOnly = true, // Set the JWT to be a HTTP only cookies to secure it from the client, only the server can modify it
                SameSite = SameSiteMode.None, // Configure for client to set the cookies
                Secure = true // Set only https can receive
            });
            
            return Ok(new { code = "success", message = "Authorized" });
        }

        // Endpoint to logout authentication
        [HttpPost("logout")]
        public ActionResult Logout()
        {
            Response.Cookies.Delete("AuthJWT");

            return Ok(new { code = "success", message = "Logged out" });
        }

        // Endpoint to get the data of authenticated user
        [HttpGet("user")]
        public async Task<ActionResult<UserDto>> GetUser()
        {
           try {
                var authJWT = Request.Cookies["AuthJWT"];
                var validatedJWT = _jwtService.ValidateJWT(authJWT);

                User user = await _userRepository.GetUserById(Guid.Parse(validatedJWT.Issuer));

                return Ok(new UserDto()
                {
                    UserId = user.UserId,
                    UserName = user.UserName,
                    Email = user.Email,
                    Avatar = user.Avatar,
                    CreatedAt = user.CreatedAt
                });
           } catch (Exception ex) {
               return Unauthorized(new { code = "error", message = "Unauthorized" });
           }
        }
    }
}