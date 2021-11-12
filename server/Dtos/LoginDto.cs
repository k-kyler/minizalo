using System.ComponentModel.DataAnnotations;

namespace minizalo.Dtos
{
    public class LoginDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; init; }
        
        [Required]
        public string Password { get; set; }
    }
}