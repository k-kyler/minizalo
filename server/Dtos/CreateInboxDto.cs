using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace minizalo.Dtos
{
    public record CreateInboxDto
    {
        public string Name { get; set; }
        
        public string Background { get; set; }
        
        public IFormFile File { get; set; }
        
        [Required]
        public string Type { get; set; }
        
        public string OwnerId { get; init; }
        
        public Guid[] MemberIds { get; set; }
    }
}