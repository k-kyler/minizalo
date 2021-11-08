using System;
using System.Collections.Generic;
using minizalo.Entities;

namespace minizalo.Repositories
{
    public interface IUsersRepository
    {
        // Get users
        User GetUserById(Guid id);
        IEnumerable<User> GetUsers();
        
        // Create user
        void CreateUser(User user);
        
        // Update user
        void UpdateUser(User user);
    }
}