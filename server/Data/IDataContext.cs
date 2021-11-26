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
        DbSet<Friend> Friends { get; set; }

        Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
    }
}