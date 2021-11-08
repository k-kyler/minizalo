using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

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
    
        [Required]
        [ForeignKey("UserId")]
        public User User { get; set; }
        
        [Required]
        [ForeignKey("InboxId")]
        public Inbox Inbox { get; set; }
    }
}