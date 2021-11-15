using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using minizalo.Data;
using minizalo.Entities;

namespace minizalo.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly IDataContext _dataContext;

        public UserRepository(IDataContext dataContext)
        {
            _dataContext = dataContext;
        }

        // Get user by email
        public async Task<User> GetUserByEmail(string email)
        {
            return await _dataContext.Users.FirstOrDefaultAsync(user => user.Email == email);
        }

        // Get user by id
        public async Task<User> GetUserById(Guid id)
        {
            return await _dataContext.Users.FirstOrDefaultAsync(user => user.UserId == id);
        }
        
        // Create user
        public async Task CreateUser(User user)
        {
            _dataContext.Users.Add(user);
            await _dataContext.SaveChangesAsync();
        }

        // Update user
        public async Task UpdateUser(User user)
        {
            var userToUpdate = await _dataContext.Users.FirstOrDefaultAsync(u => u.UserId == user.UserId);

            if (userToUpdate is null)
            {
                throw new NullReferenceException();
            }

            _dataContext.Users.Update(user);
            await _dataContext.SaveChangesAsync();
        }
    }
}