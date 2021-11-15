using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace minizalo.Entities
{
    public record Message
    {
        public Guid MessageId { get; init; }
        
        [Required]
        public string Content { get; set; }
        
        [Required]
        public string Type { get; init; }
        
        [Required]
        public DateTime CreatedAt { get; init; }
        
        // [ForeignKey("UserId")]
        public Guid UserId { get; init; }
        public User? User { get; init; }
        //
        // [ForeignKey("InboxId")]
        public Guid InboxId { get; init; }
        public Inbox? Inbox { get; init; }
    }
}