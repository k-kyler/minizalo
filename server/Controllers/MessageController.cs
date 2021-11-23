using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
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
        private readonly IWebHostEnvironment _webHostEnvironment;

        public MessageController(IMessageRepository messageRepository, JwtService jwtService, IHubContext<ChatHub, IChatClient> chatHub, IWebHostEnvironment webHostEnvironment)
        {
            _messageRepository = messageRepository;
            _jwtService = jwtService;
            _chatHub = chatHub;
            _webHostEnvironment = webHostEnvironment;
        }

        [HttpPost("create"), DisableRequestSizeLimit]
        public async Task<ActionResult> CreateMessage([FromForm] CreateMessageDto createMessageDto)
        {
            try {
                var authJWT = Request.Cookies["accessToken"];
                var validatedJWT = _jwtService.ValidateJWT(authJWT);

                Message messageToCreate;

                if (createMessageDto.Type == "image" || createMessageDto.Type == "video")
                {
                    var uploadFile = await UploadFile(createMessageDto.File);

                    if (uploadFile.Code == "error")
                    {
                        return Ok(new { code = "error", message = uploadFile.Message });
                    }
                    
                    messageToCreate = new()
                    {
                        MessageId = Guid.NewGuid(),
                        Uid = createMessageDto.Uid,
                        Username = createMessageDto.Username,
                        Avatar = createMessageDto.Avatar,
                        Content = uploadFile.FileName,
                        Type = createMessageDto.Type,
                        CreatedAt = DateTime.Now,
                        InboxRefId = createMessageDto.InboxRefId
                    };
                }
                else
                {
                    messageToCreate = new()
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
                }

                await _messageRepository.CreateMessage(messageToCreate);
                await _chatHub.Clients.All.ReceiveMessage(messageToCreate);
                
                return Ok(new { code = "success", message = messageToCreate });       
            } catch (Exception ex) {
                return Unauthorized(new { code = "error", message = "Unauthorized" });
            }
        }
        
        [NonAction]
        private async Task<UploadDto> UploadFile(IFormFile file)
        {
            // if (file.Length > 10000000)
            if (file.Length > 2000000)
            {
                return new UploadDto()
                {
                    Code = "error",
                    FileName = "",
                    Message = "The file size upload is over 10mb"
                };
            }
            
            string fileName =
                new string(Path.GetFileNameWithoutExtension(file.FileName).ToArray()).Replace(' ', '-');
            
            fileName += "-" + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(file.FileName);

            var filePath = Path.Combine(_webHostEnvironment.ContentRootPath, "Resources", fileName);

            await using var stream = new FileStream(filePath, FileMode.Create);
            await file.CopyToAsync(stream);

            return new UploadDto()
            {
                Code = "success",
                FileName = fileName
            };
        }
    }
}