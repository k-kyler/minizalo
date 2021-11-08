using System;
using System.Collections.Generic;
using System.Linq;
using minizalo.Entities;

namespace minizalo.Repositories
{
    public class UsersRepository : IUsersRepository
    {
        private readonly List<User> _users = new()
        {
            new User()
            {
                UserId = Guid.NewGuid(), 
                Avatar = "https://avatars.githubusercontent.com/u/66368949?v=4",
                Email = "khai@gmail.com",
                UserName = "Khai Bui",
                Password = "123456",
                CreatedAt = DateTimeOffset.Now
            } 
        };

        // Get user
        public IEnumerable<User> GetUsers()
        {
            return _users;
        }

        public User GetUserById(Guid id)
        {
            return _users.Where(user => user.UserId == id).SingleOrDefault();
        }
        
        // Create user
        public void CreateUser(User user)
        {
            _users.Add(user);
        }

        // Update user
        public void UpdateUser(User user)
        {
            var existingUserIndex = _users.FindIndex(existingUser => existingUser.UserId == user.UserId);

            _users[existingUserIndex] = user;
        }
    }
}