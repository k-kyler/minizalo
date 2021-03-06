using System.ComponentModel.DataAnnotations;

namespace minizalo.Dtos
{
    public record UpdateUserDto
    {
        [Required]
        [MinLength(2), MaxLength(100)]
        public string UserName { get; set; }

        public string Avatar { get; set; }
        
        [Required]
        public string Password { get; set; }
    }
}