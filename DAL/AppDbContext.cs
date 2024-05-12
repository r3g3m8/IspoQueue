using IspoQueue.DAL.Models;
using IspoQueue.DAL.Models.MediateModel;
using Microsoft.EntityFrameworkCore;

namespace IspoQueue.DAL;

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
    public DbSet<Role> Roles { get; set; }
    public DbSet<Queue> Queue { get; set; }
    public DbSet<Status> Status { get; set; }
    public DbSet<Window> Windows { get; set; }
    public DbSet<Cabinet> Cabinets { get; set; }

    //MediateModel
    public DbSet<ServiceToRole> ServicesToRoles { get; set; }
    public DbSet<UserToRole> UserToRoles { get; set; }
    public DbSet<UserToWindow> UserToWindows { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Добавьте здесь настройки моделей и отношений между ними, если это необходимо
        // связи таблицы queue
        /* modelBuilder.Entity<Queue>()
        .HasOne(q => q.Window)
        .WithMany()
        .HasForeignKey(q => q.WindowId);
    
    modelBuilder.Entity<Queue>()
        .HasOne(q => q.Status)
        .WithMany()
        .HasForeignKey(q => q.StatusId); */
    }
}