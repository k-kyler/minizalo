using System.Threading.Tasks;
using minizalo.Entities;

namespace minizalo.Repositories
{
    public interface IMessageRepository
    {
        Task CreateMessage(Message message);
    }
}