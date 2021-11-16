using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using minizalo.Data;
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

        public async Task<IEnumerable<Inbox>> GetUserInboxes(Guid userId)
        {
            return _dataContext.Inboxes.Where(inbox => inbox.MemberIds.Contains(userId));
        }

        public async Task CreateInbox(Inbox inbox)
        {
            _dataContext.Inboxes.Add(inbox);
            await _dataContext.SaveChangesAsync();
        }
    }
}