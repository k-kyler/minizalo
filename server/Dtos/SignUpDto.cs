using System;
using System.ComponentModel.DataAnnotations;

namespace minizalo.Dtos
{
    public record SignUpDto
    {
        [Required]
        [MinLength(2), MaxLength(100)]
        public string UserName { get; set; }
        
        [Required]
        [EmailAddress]
        public string Email { get; init; }
        
        [Required]
        public string Password { get; set; }
    }
}