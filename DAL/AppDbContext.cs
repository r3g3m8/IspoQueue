using IspoQueue.DAL.Helpers;
using IspoQueue.DAL.Models;
using IspoQueue.DAL.Models.MediateModel;
using Microsoft.EntityFrameworkCore;

namespace IspoQueue.DAL;

public class AppDbContext : DbContext
{

    public AppDbContext()
    {
       Database.EnsureCreated();
    }
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
            optionsBuilder.UseLazyLoadingProxies().UseNpgsql("UserID=postgres;Password=example;Server=db;Port=5432;Database=IspoQueue;");
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
        RelationHelper.CreateRelations(modelBuilder);
        InitializeDataHelper.Initialize(modelBuilder);
    }
}