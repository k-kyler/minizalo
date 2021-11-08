using minizalo.Dtos;
using minizalo.Entities;

namespace minizalo
{
    public static class Extensions
    {
        public static UserDto AsUserDto(this User user)
        {
            return new UserDto()
            {
                UserId = user.UserId,
                UserName = user.UserName,
                Email = user.Email,
                Avatar = user.Avatar,
                Password = user.Password,
                CreatedAt = user.CreatedAt
            };
        }
    }
}