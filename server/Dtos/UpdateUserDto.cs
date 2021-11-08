using System;
using System.ComponentModel.DataAnnotations;

namespace minizalo.Dtos
{
    public record UpdateUserDto
    {
        [Required]
        [MinLength(2), MaxLength(15)]
        public string UserName { get; set; }

        [MaxLength(200)]
        public string Avatar { get; set; }
        
        [Required]
        [MinLength(8), MaxLength(30)]
        public string Password { get; set; }
    }
}