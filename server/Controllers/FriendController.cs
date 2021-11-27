using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using minizalo.Dtos;
using minizalo.Entities;
using minizalo.Helpers;
using minizalo.Repositories;

namespace minizalo.Controllers
{
    [ApiController]
    [Route("api/friend")]
    public class FriendController : ControllerBase
    {
        private readonly JwtService _jwtService;
        private readonly IFriendRepository _friendRepository;

        public FriendController(JwtService jwtService, IFriendRepository friendRepository)
        {
            _jwtService = jwtService;
            _friendRepository = friendRepository;
        }
        
        // Endpoint to get friends of user
        [HttpGet]
        public async Task<ActionResult<FriendDto>> GetUserFriends()
        {
            try {
                var authJWT = Request.Cookies["accessToken"];
                var validatedJWT = _jwtService.ValidateJWT(authJWT);

                IEnumerable<FriendDto> userFriends = await _friendRepository.GetUserFriends(Guid.Parse(validatedJWT.Issuer));

                return Ok(new { code = "success", friends = userFriends });
            } catch (Exception ex) {
                return Unauthorized(new { code = "error", message = "Unauthorized" });
            }
        }

        // Endpoint to search for friends
        [HttpPost("search")]
        public async Task<ActionResult<UserDto>> SearchForFriends(string keyword)
        {
            try {
                var authJWT = Request.Cookies["accessToken"];
                var validatedJWT = _jwtService.ValidateJWT(authJWT);

                IEnumerable<UserDto> results = await _friendRepository.SearchForFriends(keyword);

                return Ok(new { code = "success", results });
            } catch (Exception ex) {
                return Unauthorized(new { code = "error", message = "Unauthorized" });
            }
        }
        
        // Endpoint to add friend
        [HttpPost("add")]
        public async Task<ActionResult> AddFriend(Friend friend)
        {
            try {
                var authJWT = Request.Cookies["accessToken"];
                var validatedJWT = _jwtService.ValidateJWT(authJWT);

                Friend friendToAdd = new Friend()
                {
                    FriendId = friend.FriendId,
                    BeFriendAt = DateTime.Now,
                    UserRefId = friend.UserRefId
                };
                
                await _friendRepository.AddFriend(friendToAdd);
            
                return Ok(new { code = "success", message = "Add friend successful" });
            } catch (Exception ex) {
                return Unauthorized(new { code = "error", message = "Unauthorized" });
            }
        }
    }
}