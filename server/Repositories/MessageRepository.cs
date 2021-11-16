using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using minizalo.Data;
using minizalo.Entities;

namespace minizalo.Repositories
{
    public class MessageRepository : IMessageRepository
    {
        private readonly IDataContext _dataContext;

        public MessageRepository(IDataContext dataContext)
        {
            _dataContext = dataContext;
        }
        
        public async Task<IEnumerable<Message>> GetMessagesByInboxRefId(Guid id)
        {
            return _dataContext.Messages.Where(message => message.InboxRefId == id);
        }

        public async Task CreateMessage(Message message)
        {
            _dataContext.Messages.Add(message);
            await _dataContext.SaveChangesAsync();
        }
    }
}