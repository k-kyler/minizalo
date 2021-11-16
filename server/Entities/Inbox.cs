using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace minizalo.Entities
{
    public record Inbox
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
        
        public List<Message> Messages { get; set; }
    }
}