using IspoQueue.DAL.Models;
using IspoQueue.DAL.Models.MediateModel;
using Microsoft.EntityFrameworkCore;

namespace IspoQueue.DAL.Helpers;

public static class InitializeDataHelper
{
    public static void Initialize(ModelBuilder modelBuilder)
    {
        // Инициализация ролей
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

        // Очереди
        var services = new List<Service>
        {
            new Service { Id = 1, Name = "Заполнение заявления в Личном кабинете абитуриента", IdentityStr = "З", QueueName = "Подача документов" },
            new Service { Id = 2, Name = "Оформление личного дела абитуриента", IdentityStr = "О", QueueName = "Подача документов" },
            new Service { Id = 3, Name = "Консультация по выбору специальностей", IdentityStr = "К", QueueName = "Консультации" },
            new Service { Id = 4, Name = "Изменение приоритетов", IdentityStr = "П", QueueName = "Консультации" },
            new Service { Id = 5, Name = "Прием оригиналов документов об образовании/Выдача документов", IdentityStr = "Д", QueueName = "Прием оригиналов документов об образовании/Выдача документов" }
        };

        modelBuilder.Entity<Service>().HasData(services);

        // Роли к сервисам
        modelBuilder.Entity<ServiceToRole>().HasData(
            new ServiceToRole { Id = Guid.NewGuid(), RoleId = roles.First(r => r.Name == "Оператор-координатор").Id, ServiceId = services.First(s => s.Id == 1).Id },
            new ServiceToRole { Id = Guid.NewGuid(), RoleId = roles.First(r => r.Name == "Оператор-модератор").Id, ServiceId = services.First(s => s.Id == 2).Id },
            new ServiceToRole { Id = Guid.NewGuid(), RoleId = roles.First(r => r.Name == "Оператор-консультант").Id, ServiceId = services.First(s => s.Id == 3).Id },
            new ServiceToRole { Id = Guid.NewGuid(), RoleId = roles.First(r => r.Name == "Оператор-консультант приоритетов").Id, ServiceId = services.First(s => s.Id == 4).Id },
            new ServiceToRole { Id = Guid.NewGuid(), RoleId = roles.First(r => r.Name == "Оператор-секретарь").Id, ServiceId = services.First(s => s.Id == 5).Id }
        );
        
        var users = new List<User>{
            new User
            {
                Id = Guid.NewGuid(),
                Login = "admin",
                PasswordHash = HashPasswordHelper.HashPassowrd("admin"),
                FirstName = "Иван",
                SecondName = "Иванов"
            },
            new User
            {
                Id = Guid.NewGuid(),
                Login = "oper1",
                PasswordHash = HashPasswordHelper.HashPassowrd("oper1"),
                FirstName = "Петр",
                SecondName = "Петров"
            },
            new User
            {
                Id = Guid.NewGuid(),
                Login = "oper2",
                PasswordHash = HashPasswordHelper.HashPassowrd("oper2"),
                FirstName = "Ольга",
                SecondName = "Сидорова"
            },
            new User
            {
                Id = Guid.NewGuid(),
                Login = "oper3",
                PasswordHash = HashPasswordHelper.HashPassowrd("oper3"),
                FirstName = "Мария",
                SecondName = "Кузнецова"
            },
            new User
            {
                Id = Guid.NewGuid(),
                Login = "oper4",
                PasswordHash = HashPasswordHelper.HashPassowrd("oper4"),
                FirstName = "Елена",
                SecondName = "Попова"
            },
            new User
            {
                Id = Guid.NewGuid(),
                Login = "oper5",
                PasswordHash = HashPasswordHelper.HashPassowrd("oper5"),
                FirstName = "Татьяна",
                SecondName = "Сидорова"
            },
            new User
            {
                Id = Guid.NewGuid(),
                Login = "display",
                PasswordHash = HashPasswordHelper.HashPassowrd("display"),
                
            },
            new User
            {
                Id = Guid.NewGuid(),
                Login = "terminal",
                PasswordHash = HashPasswordHelper.HashPassowrd("terminal"),
            }
        };
        
        modelBuilder.Entity<User>().HasData(users);
        
        modelBuilder.Entity<UserToRole>().HasData(
            // Администратор
            new UserToRole() { Id = Guid.NewGuid(), UserId = users.First(u => u.Login == "admin").Id, RoleId = roles.First(r => r.Name == "Администратор").Id },

            // Операторы
            new UserToRole() { Id = Guid.NewGuid(), UserId = users.First(u => u.Login == "oper1").Id, RoleId = roles.First(r => r.Name == "Оператор-координатор").Id },
            new UserToRole() { Id = Guid.NewGuid(), UserId = users.First(u => u.Login == "oper2").Id, RoleId = roles.First(r => r.Name == "Оператор-модератор").Id },
            new UserToRole() { Id = Guid.NewGuid(), UserId = users.First(u => u.Login == "oper3").Id, RoleId = roles.First(r => r.Name == "Оператор-консультант").Id },
            new UserToRole() { Id = Guid.NewGuid(), UserId = users.First(u => u.Login == "oper5").Id, RoleId = roles.First(r => r.Name == "Оператор-секретарь").Id },
            new UserToRole() { Id = Guid.NewGuid(), UserId = users.First(u => u.Login == "oper4").Id, RoleId = roles.First(r => r.Name == "Оператор-консультант приоритетов").Id },

            // Дисплей
            new UserToRole() { Id = Guid.NewGuid(), UserId = users.First(u => u.Login == "display").Id, RoleId = roles.First(r => r.Name == "Дисплей").Id },

            // Терминал
            new UserToRole() { Id = Guid.NewGuid(), UserId = users.First(u => u.Login == "terminal").Id, RoleId = roles.First(r => r.Name == "Терминал").Id }
        );
        
        var cabinets = new List<Cabinet>
        {
            new Cabinet { Id = Guid.NewGuid(), Name = "110" },
            new Cabinet { Id = Guid.NewGuid(), Name = "113" },
            new Cabinet { Id = Guid.NewGuid(), Name = "115" }
        };
        var windows = new List<Window>
        {
            // Кабинет 110
            new Window { Id = Guid.NewGuid(), Name = "1", IsActive = true, CabinetId = cabinets[0].Id },
            new Window { Id = Guid.NewGuid(), Name = "2", IsActive = false, CabinetId = cabinets[0].Id },
            new Window { Id = Guid.NewGuid(), Name = "3", IsActive = true, CabinetId = cabinets[0].Id },
            new Window { Id = Guid.NewGuid(), Name = "4", IsActive = true, CabinetId = cabinets[0].Id },

            // Кабинет 113
            new Window { Id = Guid.NewGuid(), Name = "1", IsActive = true, CabinetId = cabinets[1].Id },

            // Кабинет 115
            new Window { Id = Guid.NewGuid(), Name = "1", IsActive = true, CabinetId = cabinets[2].Id },
            new Window { Id = Guid.NewGuid(), Name = "2", IsActive = true, CabinetId = cabinets[2].Id }
        };
        modelBuilder.Entity<Cabinet>().HasData(cabinets);
        modelBuilder.Entity<Window>().HasData(windows);
        
        var userToWindows = new List<UserToWindow>
        {
            // Оператор 1 (oper1) - Кабинет 110, окно 1
            new UserToWindow { Id = Guid.NewGuid(), UserId = users.First(u => u.Login == "oper1").Id, WindowId = windows.First(w => w.CabinetId == cabinets[0].Id && w.Name == "1").Id },

            // Оператор 2 (oper2) - Кабинет 110, окно 2
            new UserToWindow { Id = Guid.NewGuid(), UserId = users.First(u => u.Login == "oper2").Id, WindowId = windows.First(w => w.CabinetId == cabinets[0].Id && w.Name == "2").Id },

            // Оператор 3 (oper3) - Кабинет 113, окно 1
            new UserToWindow { Id = Guid.NewGuid(), UserId = users.First(u => u.Login == "oper3").Id, WindowId = windows.First(w => w.CabinetId == cabinets[1].Id && w.Name == "1").Id },

            // Оператор 4 (oper4) - Кабинет 110, окно 3
            new UserToWindow { Id = Guid.NewGuid(), UserId = users.First(u => u.Login == "oper4").Id, WindowId = windows.First(w => w.CabinetId == cabinets[0].Id && w.Name == "3").Id },

            // Оператор 5 (oper5) - Кабинет 115, окно 1
            new UserToWindow { Id = Guid.NewGuid(), UserId = users.First(u => u.Login == "oper5").Id, WindowId = windows.First(w => w.CabinetId == cabinets[2].Id && w.Name == "1").Id },
        };
        modelBuilder.Entity<UserToWindow>().HasData(userToWindows);

        
        modelBuilder.Entity<Status>().HasData(
            new Status() { Id = 1, Name = "В ожидании"},
            new Status() { Id = 2, Name = "Активен"},
            new Status() { Id = 3, Name = "Завершен"},
            new Status() { Id = 4, Name = "Отложен"}
        );
    }
}