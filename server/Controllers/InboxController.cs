using System;
using System.Collections.Generic;
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
    [Route("api/inbox")]
    public class InboxController : ControllerBase
    {
        private readonly IInboxRepository _inboxRepository;
        private readonly JwtService _jwtService;
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly IHubContext<ChatHub, IChatClient> _chatHub;

        public InboxController(IInboxRepository inboxRepository, JwtService jwtService, IWebHostEnvironment webHostEnvironment, IHubContext<ChatHub, IChatClient> chatHub)
        {
            _inboxRepository = inboxRepository;
            _jwtService = jwtService;
            _webHostEnvironment = webHostEnvironment;
            _chatHub = chatHub;
        }

        // Get all inboxes that user has joined
        [HttpGet("user")]
        public async Task<ActionResult<InboxDto>> GetUserInboxes()
        {
            try {
                var authJWT = Request.Cookies["accessToken"];
                var validatedJWT = _jwtService.ValidateJWT(authJWT);
                
                IEnumerable<InboxDto> inboxes = await _inboxRepository.GetUserInboxes(Guid.Parse(validatedJWT.Issuer));
                
                return Ok(new 
                {
                    code = "success", 
                    message = "Retrieve user inboxes successful",
                    inboxes
                });
            } catch (Exception ex) {
                return Unauthorized(new { code = "error", message = "Unauthorized" });
            }
        }

        // Create new inbox
        [HttpPost("create"), DisableRequestSizeLimit]
        public async Task<ActionResult> CreateInbox([FromForm] CreateInboxDto createInboxDto)
        {
            try {
                var authJWT = Request.Cookies["accessToken"];
                var validatedJWT = _jwtService.ValidateJWT(authJWT);

                Inbox inboxToCreate;

                if (createInboxDto.Type == "group" && createInboxDto.File is not null)
                {
                    var uploadFile = await UploadFile(createInboxDto.File);
                    
                    if (uploadFile.Code == "error")
                    {
                        return Ok(new { code = "error", message = uploadFile.Message });
                    }

                    inboxToCreate = new()
                    {
                        InboxId = Guid.NewGuid(),
                        Name = createInboxDto.Name,
                        Background = uploadFile.FileName,
                        Type = createInboxDto.Type,
                        CreatedAt = DateTime.Now,
                        OwnerId = createInboxDto.OwnerId,
                        MemberIds = createInboxDto.MemberIds
                    };
                }
                else
                {
                    inboxToCreate = new()
                    {
                        InboxId = Guid.NewGuid(),
                        Name = createInboxDto.Name,
                        Background = "No background",
                        Type = createInboxDto.Type,
                        CreatedAt = DateTime.Now,
                        OwnerId = createInboxDto.OwnerId,
                        MemberIds = createInboxDto.MemberIds
                    };   
                }

                await _inboxRepository.CreateInbox(inboxToCreate);
                await _chatHub.Clients.All.ReceiveInbox(inboxToCreate);
    
                return Ok(new { code = "success", inbox = inboxToCreate, message = "Create inbox successful" });
            } catch (Exception ex) {
                return Unauthorized(new { code = "error", message = "Unauthorized" });
            }
        }
        
        [NonAction]
        private async Task<UploadDto> UploadFile(IFormFile file)
        {
            var fileExtension = Path.GetExtension(file.FileName);
            var acceptedExtension = new[]
            {
                ".png", 
                ".jpg", 
                ".jpeg",
                ".pdf",
                ".doc",
                ".docx",
                ".xls",
                ".xlsx",
                ".txt",
                ".zip",
                ".rar"
            };
            
            if (file.Length > 10000000)
            {
                return new UploadDto()
                {
                    Code = "error",
                    FileName = "",
                    Message = "The file size upload is over 10mb"
                };
            }
            
            if (!acceptedExtension.Contains(fileExtension))
            {
                return new UploadDto()
                {
                    Code = "error",
                    FileName = "",
                    Message = "The file extension is not supported"
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