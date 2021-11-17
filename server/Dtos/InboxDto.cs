using System;
using System.ComponentModel.DataAnnotations;
using minizalo.Entities;

namespace minizalo.Dtos
{
    public record InboxDto
    {
        public Guid InboxId { get; init; }
        
        public string Name { get; set; }
        
        [Required]
        public DateTime CreatedAt { get; init; }
        
        public string Background { get; set; }
        
        [Required]
        public string Type { get; set; }
        
        public string OwnerId { get; init; }

        public Guid[] MemberIds { get; set; }
    }
}