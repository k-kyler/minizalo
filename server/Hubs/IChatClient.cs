using System.Threading.Tasks;
using minizalo.Entities;

namespace minizalo.Hubs
{
    public interface IChatClient
    {
        Task ReceiveMessage(Message message);
    }
}