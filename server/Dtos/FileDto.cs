using Microsoft.AspNetCore.Http;

namespace minizalo.Dtos
{
    public class FileDto
    {
        public string FileName { get; set; }
        public IFormFile FormFile { get; set; }
    }
}