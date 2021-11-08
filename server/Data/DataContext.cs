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

        public async Task<int> AsyncSaveChanges(CancellationToken cancellationToken = default)
        {
            return SaveChanges();
        }
    }
}