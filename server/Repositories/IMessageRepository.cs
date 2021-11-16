using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using minizalo.Entities;

namespace minizalo.Repositories
{
    public interface IMessageRepository
    {
        Task<IEnumerable<Message>> GetMessagesByInboxRefId(Guid id);
        Task CreateMessage(Message message);
    }
}