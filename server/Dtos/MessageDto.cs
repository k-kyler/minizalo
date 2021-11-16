using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace minizalo.Dtos
{
    public record MessageDto
    {
        public Guid MessageId { get; init; }

        [Required]
        public Guid Uid { get; init; }
        
        [Required]
        public string Username { get; set; }
        
        public string Avatar { get; set; }
        
        [Required]
        public string Content { get; set; }
        
        [Required]
        public string Type { get; init; }
        
        [Required]
        public DateTime CreatedAt { get; init; }

        [ForeignKey("FK_Inbox")]
        public Guid InboxRefId { get; init; }
    }
}