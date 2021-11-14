using System.ComponentModel.DataAnnotations;

namespace minizalo.Dtos
{
    public class SignInDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; init; }
        
        [Required]
        public string Password { get; set; }
    }
}