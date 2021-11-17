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
    [Route("api/message")]
    public class MessageController : ControllerBase
    {
        private readonly IMessageRepository _messageRepository;
        private readonly JwtService _jwtService;

        public MessageController(IMessageRepository messageRepository, JwtService jwtService)
        {
            _messageRepository = messageRepository;
            _jwtService = jwtService;
        }

        [HttpPost("create")]
        public async Task<ActionResult> CreateMessage(CreateMessageDto createMessageDto)
        {
            try {
                var authJWT = Request.Cookies["accessToken"];
                var validatedJWT = _jwtService.ValidateJWT(authJWT);
                
                Message message = new()
                {
                    MessageId = Guid.NewGuid(),
                    Uid = createMessageDto.Uid,
                    Username = createMessageDto.Username,
                    Avatar = createMessageDto.Avatar,
                    Content = createMessageDto.Content,
                    Type = createMessageDto.Type,
                    CreatedAt = createMessageDto.CreatedAt,
                    InboxRefId = createMessageDto.InboxRefId
                };
    
                await _messageRepository.CreateMessage(message);
                
                return Ok(new { code = "success", message });       
            } catch (Exception ex) {
                return Unauthorized(new { code = "error", message = "Unauthorized" });
            }
        }
    }
}