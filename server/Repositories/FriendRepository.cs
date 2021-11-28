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

        public async Task<IEnumerable<UserDto>> SearchForFriends(string keyword) 
        {
            var matchedUsers = await _dataContext.Users.Where(user => user.UserName.ToLower().Trim().Contains(keyword)).Select(user => new UserDto()
            {
                UserId = user.UserId,
                UserName = user.UserName,
                Avatar = user.Avatar,
                Email = user.Email,
                CreatedAt = user.CreatedAt
            }).ToListAsync();

            return matchedUsers;
        }

        public async Task<IEnumerable<FriendDto>> GetUserFriends(Guid id)
        {
            // Get friends of sender and receiver
            var friends = await _dataContext.Friends.Where(friend => friend.FriendId == id || friend.UserRefId == id).ToListAsync();

            // Configure for returning friend data
            var friendsToReturn = friends.Select(friend => new FriendDto()
            {
                SenderId = friend.UserRefId,
                SenderData = new UserDto(),
                ReceiverId = friend.FriendId,
                ReceiverData = new UserDto(),
                BeFriendAt = friend.BeFriendAt
            }).ToList();

            // Add friend data to configuration above
            foreach (var friend in friendsToReturn)
            {
                var senderFriendData = await _dataContext.Users.FirstOrDefaultAsync(user => user.UserId == friend.SenderId);
                var receiverFriendData = await _dataContext.Users.FirstOrDefaultAsync(user => user.UserId == friend.ReceiverId);
                
                friend.SenderData = new UserDto()
                {
                    Avatar = senderFriendData.Avatar,
                    CreatedAt = senderFriendData.CreatedAt,
                    Email = senderFriendData.Email,
                    UserName = senderFriendData.UserName,
                    UserId = senderFriendData.UserId
                };
                friend.ReceiverData = new UserDto()
                {
                    Avatar = receiverFriendData.Avatar,
                    CreatedAt = receiverFriendData.CreatedAt,
                    Email = receiverFriendData.Email,
                    UserName = receiverFriendData.UserName,
                    UserId = receiverFriendData.UserId
                };
            }

            return friendsToReturn;
        }
    }
}