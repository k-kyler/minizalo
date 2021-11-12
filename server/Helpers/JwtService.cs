using System;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace minizalo.Helpers
{
    public class JwtService
    {
        private string secretKey = "$2a$12$0HZrSq/jPMhyNNCnCwJmMe9cPPxgunxVEh43pQk3oyvk4PxTv5F0.";
        
        public string GenerateJWT(string id)
        {
            var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
            var signingCredentials =
                new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256Signature);
            var header = new JwtHeader(signingCredentials);
            var payload = new JwtPayload(id, null , null, null, DateTime.Today.AddDays(5)); // The expired time of payload is 5 days
            var securityToken = new JwtSecurityToken(header, payload);

            return new JwtSecurityTokenHandler().WriteToken(securityToken);
        }

        public JwtSecurityToken ValidateJWT(string jwt)
        {
            var handler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(secretKey);

            handler.ValidateToken(jwt, new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = false,
                ValidateAudience = false
            }, out SecurityToken validatedToken);

            return validatedToken as JwtSecurityToken;
        }
    }
}