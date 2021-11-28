using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace minizalo.Dtos
{
    public record FriendDto
    {
        public Guid SenderId { get; set; }
        public UserDto SenderData { get; set; }
        public Guid ReceiverId { get; set; }
        public UserDto ReceiverData { get; set; }
        public DateTime BeFriendAt { get; set; }
    }
}