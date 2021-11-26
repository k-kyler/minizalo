using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace minizalo.Entities
{
    public record Friend
    {
        public Guid FriendId { get; set; }
        
        public DateTime BeFriendAt { get; set; }
        
        [ForeignKey("FK_User")]
        public Guid UserRefId { get; set; }
    };
}