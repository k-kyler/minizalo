using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using minizalo.Entities;

namespace minizalo.Repositories
{
    public interface IInboxRepository
    {
        Task<IEnumerable<Inbox>> GetUserInboxes(Guid userId);
        Task CreateInbox(Inbox inbox);
    }
}