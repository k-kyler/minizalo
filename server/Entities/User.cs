using System;
using System.ComponentModel.DataAnnotations;

namespace minizalo.Entities
{
    public record User
    {
        public Guid UserId { get; init; }
        
        [Required]
        [MinLength(2), MaxLength(15)]
        public string UserName { get; set; }

        [MaxLength(200)]
        public string Avatar { get; set; }
        
        [Required]
        [EmailAddress]
        public string Email { get; init; }
        
        [Required]
        public string Password { get; set; }
        
        [Required]
        public DateTimeOffset CreatedAt { get; init; }
    }
}