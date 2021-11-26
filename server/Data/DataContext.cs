using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using minizalo.Entities;

namespace minizalo.Data
{
    public class DataContext : DbContext, IDataContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
            
        }
        
        public DbSet<User> Users { get; set; }
        public DbSet<Inbox> Inboxes { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<Friend> Friends { get; set; }

        public async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            return SaveChanges();
        }
    }
}