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
    public class InboxRepository : IInboxRepository
    {
        private readonly IDataContext _dataContext;

        public InboxRepository(IDataContext dataContext)
        {
            _dataContext = dataContext;
        }

        private List<Message> GetMessagesByInboxRefId(Guid id)
        {
            return _dataContext.Messages.Where(message => message.InboxRefId == id).ToList();
        }

        public async Task<IEnumerable<InboxDto>> GetUserInboxes(Guid userId)
        {
            var inboxes = await _dataContext.Inboxes.Where(inbox => inbox.MemberIds.Contains(userId)).ToListAsync();
            
            // Convert to InboxDto type to custom response data
            var newInboxes = inboxes.Select(inbox => new InboxDto() 
            {
                InboxId = inbox.InboxId,
                Name = inbox.Name,
                Background = inbox.Background,
                MemberIds = inbox.MemberIds,
                OwnerId = inbox.OwnerId,
                Type = inbox.Type,
                CreatedAt = inbox.CreatedAt,
                Messages = inbox.Messages
            });

            IEnumerable<InboxDto> userInboxes = newInboxes.ToList();
            
            // Add messages for each inbox and users information for personal inboxes
            foreach (var inbox in userInboxes)
            {
                inbox.Messages = GetMessagesByInboxRefId(inbox.InboxId);

                if (inbox.Type == "personal")
                {
                    List<UserDto> users = new List<UserDto>();
                
                    foreach (var memberId in inbox.MemberIds)
                    {
                        User user = await _dataContext.Users.FindAsync(memberId);
                        UserDto newUser = new UserDto()
                        {
                            UserId = user.UserId,
                            UserName = user.UserName,
                            Avatar = user.Avatar,
                            Email = user.Email,
                            CreatedAt = user.CreatedAt
                        };
                        
                        users.Add(newUser);
                    }       
                    
                    inbox.Users = users;
                }
            }

            return userInboxes;
        }

        public async Task CreateInbox(Inbox inbox)
        {
            _dataContext.Inboxes.Add(inbox);
            await _dataContext.SaveChangesAsync();
        }
    }
}