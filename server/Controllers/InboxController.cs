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
    [Route("api/inbox")]
    public class InboxController : ControllerBase
    {
        private readonly IInboxRepository _inboxRepository;
        private readonly JwtService _jwtService;

        public InboxController(IInboxRepository inboxRepository, JwtService jwtService)
        {
            _inboxRepository = inboxRepository;
            _jwtService = jwtService;
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
        [HttpPost("create")]
        public async Task<ActionResult> CreateInbox(CreateInboxDto createInboxDto)
        {
            try {
                var authJWT = Request.Cookies["accessToken"];
                var validatedJWT = _jwtService.ValidateJWT(authJWT);

                Inbox inbox = new()
                {
                    InboxId = Guid.NewGuid(),
                    Name = createInboxDto.Name,
                    Background = createInboxDto.Background,
                    Type = createInboxDto.Type,
                    CreatedAt = DateTime.Now,
                    OwnerId = createInboxDto.OwnerId,
                    MemberIds = createInboxDto.MemberIds
                };
    
                await _inboxRepository.CreateInbox(inbox);
    
                return Ok(new { code = "success", inbox, message = "Create inbox successful" });
            } catch (Exception ex) {
                return Unauthorized(new { code = "error", message = "Unauthorized" });
            }
        }
    }
}