using System;
using System.ComponentModel.DataAnnotations;

namespace minizalo.Dtos
{ 
    public record UserDto
    {
        public Guid UserId { get; init; }
        
        [Required]
        [MinLength(2), MaxLength(100)]
        public string UserName { get; set; }

        public string Avatar { get; set; }
        
        [Required]
        [EmailAddress]
        public string Email { get; init; }
        
        [Required]
        public DateTimeOffset CreatedAt { get; init; }
    }
}