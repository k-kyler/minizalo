using System;
using System.ComponentModel.DataAnnotations;

namespace minizalo.Dtos
{
    public record CreateInboxDto
    {
        public string Name { get; set; }
        
        public string Background { get; set; }
        
        [Required]
        public string Type { get; set; }
        
        public string OwnerId { get; init; }
        
        public Guid[] MemberIds { get; set; }
    }
}