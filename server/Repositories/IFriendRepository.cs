using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using minizalo.Dtos;
using minizalo.Entities;

namespace minizalo.Repositories
{
    public interface IFriendRepository
    {
        Task AddFriend(Friend friend);
        Task<IEnumerable<UserDto>> SearchForFriends(string keyword);
        Task<IEnumerable<FriendDto>> GetUserFriends(Guid id);
    }
}