using System;
using System.Threading.Tasks;
using minizalo.Entities;

namespace minizalo.Repositories
{
    public interface IUserRepository
    {
        // Get user by email
        Task<User> GetUserByEmail(string email);

        // Get user by id
        Task<User> GetUserById(Guid id);
        
        // Create user
        Task CreateUser(User user);
        
        // Update user
        Task UpdateUser(User user);
    }
}