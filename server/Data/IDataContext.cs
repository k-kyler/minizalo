using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using minizalo.Entities;

namespace minizalo.Data
{
    public interface IDataContext
    {
        DbSet<User> Users { get; set; }
        DbSet<Inbox> Inboxes { get; set; }
        DbSet<Message> Messages { get; set; }

        Task<int> AsyncSaveChanges(CancellationToken cancellationToken = default);
    }
}