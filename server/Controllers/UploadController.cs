using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using minizalo.Dtos;
using minizalo.Helpers;

namespace minizalo.Controllers
{
    [ApiController]
    [Route("api/upload")]
    public class UploadController : ControllerBase
    {
        private readonly JwtService _jwtService;

        public UploadController(JwtService jwtService)
        {
            _jwtService = jwtService;
        }

        [HttpPost, DisableRequestSizeLimit]
        public async Task<ActionResult<FileDto>> Upload([FromForm] FileDto file)
        {
            try {
                var authJWT = Request.Cookies["accessToken"];
                var validatedJWT = _jwtService.ValidateJWT(authJWT);

                string path = Path.Combine(Directory.GetCurrentDirectory(), "Resources", file.FileName);

                await using (Stream stream = new FileStream(path, FileMode.Create))
                {
                    await file.FormFile.CopyToAsync(stream);
                }

                return Ok(new { code = "success", message = "Upload file successful", path });
            } catch (Exception ex) {
                return Unauthorized(new { code = "error", message = "Unauthorized" });
            }
        }
    }
}