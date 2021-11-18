using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using minizalo.Dtos;
using minizalo.Entities;
using minizalo.Helpers;
using minizalo.Hubs;
using minizalo.Repositories;

namespace minizalo.Controllers
{
    [ApiController]
    [Route("api/message")]
    public class MessageController : ControllerBase
    {
        private readonly IMessageRepository _messageRepository;
        private readonly JwtService _jwtService;
        private readonly IHubContext<ChatHub, IChatClient> _chatHub;

        public MessageController(IMessageRepository messageRepository, JwtService jwtService, IHubContext<ChatHub, IChatClient> chatHub)
        {
            _messageRepository = messageRepository;
            _jwtService = jwtService;
            _chatHub = chatHub;
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
                    CreatedAt = DateTime.Now,
                    InboxRefId = createMessageDto.InboxRefId
                };
    
                await _messageRepository.CreateMessage(message);
                await _chatHub.Clients.All.ReceiveMessage(message);
                
                return Ok(new { code = "success", message });       
            } catch (Exception ex) {
                return Unauthorized(new { code = "error", message = "Unauthorized" });
            }
        }
    }
}