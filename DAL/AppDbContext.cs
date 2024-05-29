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
            .WithOne(w => w.Cabinet)
            .HasForeignKey(c => c.CabinetId);

        // Инициализация данных
        var roles = new List<Role>
        {
            new Role { Id = Guid.NewGuid(), Name = "Терминал" },
            new Role { Id = Guid.NewGuid(), Name = "Администратор" },
            new Role { Id = Guid.NewGuid(), Name = "Дисплей" },
            new Role { Id = Guid.NewGuid(), Name = "Оператор-координатор" },
            new Role { Id = Guid.NewGuid(), Name = "Оператор-консультант" },
            new Role { Id = Guid.NewGuid(), Name = "Оператор-консультант приоритетов" },
            new Role { Id = Guid.NewGuid(), Name = "Оператор-секретарь" },
            new Role { Id = Guid.NewGuid(), Name = "Оператор-модератор" }
        };
        
        modelBuilder.Entity<Role>().HasData(roles);

        // Initial seed data for Services
        var services = new List<Service>
        {
            new Service { Id = 1, Name = "Заполнение заявления в Личном кабинете абитуриента", IdentityStr = "З", QueueName = "Подача документов" },
            new Service { Id = 2, Name = "Оформление личного дела абитуриента", IdentityStr = "О", QueueName = "Подача документов" },
            new Service { Id = 3, Name = "Консультация по выбору специальностей", IdentityStr = "К", QueueName = "Консультации" },
            new Service { Id = 4, Name = "Изменение приоритетов", IdentityStr = "П", QueueName = "Консультации" },
            new Service { Id = 5, Name = "Прием оригиналов документов об образовании/Выдача документов", IdentityStr = "Д", QueueName = "Прием оригиналов документов об образовании/Выдача документов" }
        };

        modelBuilder.Entity<Service>().HasData(services);

        // Initial seed data for RoleServices
        modelBuilder.Entity<ServiceToRole>().HasData(
            new ServiceToRole { Id = Guid.NewGuid(), RoleId = roles.First(r => r.Name == "Оператор-координатор").Id, ServiceId = services.First(s => s.Id == 1).Id },
            new ServiceToRole { Id = Guid.NewGuid(), RoleId = roles.First(r => r.Name == "Оператор-модератор").Id, ServiceId = services.First(s => s.Id == 2).Id },
            new ServiceToRole { Id = Guid.NewGuid(), RoleId = roles.First(r => r.Name == "Оператор-консультант").Id, ServiceId = services.First(s => s.Id == 3).Id },
            new ServiceToRole { Id = Guid.NewGuid(), RoleId = roles.First(r => r.Name == "Оператор-консультант приоритетов").Id, ServiceId = services.First(s => s.Id == 4).Id },
            new ServiceToRole { Id = Guid.NewGuid(), RoleId = roles.First(r => r.Name == "Оператор-секретарь").Id, ServiceId = services.First(s => s.Id == 5).Id }
        );

        var admin = new User()
        {
            Id = Guid.NewGuid(),
            Login = "admin",
            PasswordHash = HashPasswordHelper.HashPassowrd("admin"),
        };
        
        modelBuilder.Entity<User>().HasData(admin);
        
        modelBuilder.Entity<UserToRole>().HasData(
            new UserToRole() { Id = Guid.NewGuid(), UserId = admin.Id, RoleId = roles.First(r => r.Name == "Администратор").Id}
        );
        
        modelBuilder.Entity<Status>().HasData(
            new Status() { Id = 1, Name = "В ожидании"},
            new Status() { Id = 2, Name = "Активен"},
            new Status() { Id = 3, Name = "Завершен"},
            new Status() { Id = 4, Name = "Отложен"}
        );
    }
}