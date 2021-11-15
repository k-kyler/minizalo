using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using minizalo.Entities;

namespace minizalo.Dtos
{ 
    public record UserDto
    {
        public Guid UserId { get; init; }
        
        [Required]
        [MinLength(2), MaxLength(100)]
        public string UserName { get; set; }

        [MaxLength(200)]
        public string Avatar { get; set; }
        
        [Required]
        [EmailAddress]
        public string Email { get; init; }
        
        [Required]
        public DateTimeOffset CreatedAt { get; init; }
    }
}