using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using minizalo.Dtos;
using minizalo.Entities;

namespace minizalo.Repositories
{
    public interface IInboxRepository
    {
        Task<IEnumerable<InboxDto>> GetUserInboxes(Guid userId);
        Task CreateInbox(Inbox inbox);
    }
}