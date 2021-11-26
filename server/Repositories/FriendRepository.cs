using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using minizalo.Data;
using minizalo.Dtos;
using minizalo.Entities;

namespace minizalo.Repositories
{
    public class FriendRepository : IFriendRepository
    {
        private readonly IDataContext _dataContext;

        public FriendRepository(IDataContext dataContext)
        {
            _dataContext = dataContext;
        }
        
        public async Task AddFriend(Friend friend)
        {
            _dataContext.Friends.Add(friend);
            await _dataContext.SaveChangesAsync();
        }

        public async Task<IEnumerable<FriendDto>> GetUserFriends(Guid id)
        {
            var friends = await _dataContext.Friends.Where(friend => friend.UserRefId == id || friend.FriendId == id).ToListAsync();
            var modifiedFriends = friends.Select(friend => new FriendDto()
            {
                FriendId = friend.FriendId,
                Data = new UserDto(),
                BeFriendAt = friend.BeFriendAt
            });
            var userFriends = modifiedFriends.ToList();
            
            foreach (var friend in userFriends)
            {
                var friendData = await _dataContext.Users.FirstOrDefaultAsync(user => user.UserId == friend.FriendId);
                
                friend.Data = new UserDto()
                {
                    Avatar = friendData.Avatar,
                    CreatedAt = friendData.CreatedAt,
                    Email = friendData.Email,
                    UserName = friendData.UserName,
                    UserId = friendData.UserId
                };
            }

            return userFriends;
        }
    }
}