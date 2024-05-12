// YourDbContext.cs

using IspoQueue.DAL.Models;
using IspoQueue.DAL.Models.MediateModels;
using Microsoft.EntityFrameworkCore;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        base.OnConfiguring(optionsBuilder);
        if (!optionsBuilder.IsConfigured)
        {
            optionsBuilder.UseNpgsql("UserID=postgres;Password=123qweQWE;Server=localhost;Port=6699;Database=IspoQueue;");
        }
    }

    public DbSet<User> Users { get; set; }
    public DbSet<Service> Services { get; set; }
    public DbSet<UserRole> Roles { get; set; }
    public DbSet<Queue> Queue { get; set; }
    public DbSet<QueueStatus> Status { get; set; }
    public DbSet<Window> Windows { get; set; }
    public DbSet<Cabinet> Cabinets { get; set; }

    //MediateModel
    public DbSet<ServiceToRole> ServicesToRoles { get; set; }
    public DbSet<UserToRole> UserToRoles { get; set; }
    public DbSet<UserToWindow> UserToWindows { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Добавьте здесь настройки моделей и отношений между ними, если это необходимо
    }
}