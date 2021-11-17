using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
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

        public async Task<IEnumerable<Inbox>> GetUserInboxes(Guid userId)
        {
            var inboxes = await _dataContext.Inboxes.Where(inbox => inbox.MemberIds.Contains(userId)).ToListAsync();

            foreach (var inbox in inboxes)
            {
                inbox.Messages = GetMessagesByInboxRefId(inbox.InboxId);
            }

            return inboxes;
        }

        public async Task CreateInbox(Inbox inbox)
        {
            _dataContext.Inboxes.Add(inbox);
            await _dataContext.SaveChangesAsync();
        }
    }
}