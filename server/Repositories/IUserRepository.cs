using System;
using System.Threading.Tasks;
using minizalo.Entities;

namespace minizalo.Repositories
{
    public interface IUserRepository
    {
        Task<User> GetUserByEmail(string email);
        Task<User> GetUserById(Guid id);
        Task CreateUser(User user);
        Task UpdateUser(User user);
    }
}