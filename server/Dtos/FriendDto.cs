using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace minizalo.Dtos
{
    public record FriendDto
    {
        public Guid FriendId { get; set; }
        
        public UserDto Data { get; set; }
        
        public DateTime BeFriendAt { get; set; }
    }
}