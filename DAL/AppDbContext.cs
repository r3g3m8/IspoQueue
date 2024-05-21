using IspoQueue.DAL.Models;
using IspoQueue.DAL.Models.MediateModel;
using Microsoft.EntityFrameworkCore;

namespace IspoQueue.DAL;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
        // Database.EnsureDeleted();
        // Database.EnsureCreated();
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseLazyLoadingProxies();
        base.OnConfiguring(optionsBuilder);
        if (!optionsBuilder.IsConfigured)
        {
            optionsBuilder.UseLazyLoadingProxies().UseNpgsql("UserID=postgres;Password=123qweQWE;Server=localhost;Port=6699;Database=IspoQueue;");
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
        // Пользователь к ролям М-М
        modelBuilder.Entity<User>()
            .HasMany(u => u.UserRoles)
            .WithOne(ur => ur.User)
            .HasForeignKey(ur => ur.UserId);

        modelBuilder.Entity<Role>()
            .HasMany(r => r.UserRoles)
            .WithOne(ur => ur.Role)
            .HasForeignKey(ur => ur.RoleId);
        
        // Пользователь к окнам М-М
        modelBuilder.Entity<User>()
            .HasMany(u => u.UserWindows)
            .WithOne(uw => uw.User)
            .HasForeignKey(uw => uw.UserId);

        modelBuilder.Entity<Window>()
            .HasMany(w => w.UserWindows)
            .WithOne(uw => uw.Window)
            .HasForeignKey(uw => uw.WindowId);

        // Очередь к статусу М-1
        modelBuilder.Entity<Queue>()
            .HasOne(q => q.Status)
            .WithMany(s => s.Queues)
            .HasForeignKey(q => q.StatusId);

        // Очередь к услуге М-1
        modelBuilder.Entity<Queue>()
            .HasOne(q => q.Service)
            .WithMany(s => s.Queues)
            .HasForeignKey(q => q.ServiceId);

        // Очередь к окну М-1
        modelBuilder.Entity<Queue>()
            .HasOne(q => q.Window)
            .WithMany(w => w.Queues)
            .HasForeignKey(q => q.WindowId);

        // Сервис к роли М-М
        modelBuilder.Entity<ServiceToRole>()
            .HasOne(str => str.Role)
            .WithMany(r => r.ServiceRoles)
            .HasForeignKey(str => str.RoleId);

        modelBuilder.Entity<ServiceToRole>()
            .HasOne(str => str.Service)
            .WithMany(s => s.ServiceRoles)
            .HasForeignKey(str => str.ServiceId);

        // Кабинет к окнам 1-М
        modelBuilder.Entity<Cabinet>()
            .HasMany(c => c.Windows)
            .WithOne(w => w.Cabinet);
    }
}