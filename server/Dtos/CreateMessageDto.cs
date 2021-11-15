using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using minizalo.Entities;

namespace minizalo.Dtos
{
    public record CreateMessageDto
    {
        [Required]
        public string Content { get; set; }
        
        [Required]
        public string Type { get; init; }
        
        [Required]
        public DateTime CreatedAt { get; init; }
        
        public Guid UserId { get; init; }
        public User? User { get; init; }

        public Guid InboxId { get; init; }
        public Inbox? Inbox { get; init; }
    }
}