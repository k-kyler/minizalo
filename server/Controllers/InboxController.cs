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

        [HttpGet("user")]
        public async Task<ActionResult<InboxDto>> GetUserInboxes()
        {
            try {
                var authJWT = Request.Cookies["accessToken"];
                var validatedJWT = _jwtService.ValidateJWT(authJWT);

                IEnumerable<Inbox> inboxes = await _inboxRepository.GetUserInboxes(Guid.Parse(validatedJWT.Issuer));

                return Ok(new { code = "success", message = "Retrieve user inboxes successful", inboxes });
            } catch (Exception ex) {
                return Unauthorized(new { code = "error", message = "Unauthorized" });
            }
        }

        [HttpPost("create")]
        public async Task<ActionResult> CreateInbox(CreateInboxDto createInboxDto)
        {
            Inbox inbox = new()
            {
                InboxId = Guid.NewGuid(),
                Name = createInboxDto.Name,
                Background = createInboxDto.Background,
                Type = createInboxDto.Type,
                CreatedAt = createInboxDto.CreatedAt,
                OwnerId = createInboxDto.OwnerId,
                MemberIds = createInboxDto.MemberIds
            };

            await _inboxRepository.CreateInbox(inbox);

            return Ok(new { code = "success", inbox, message = "Create inbox successful" });
        }
    }
}