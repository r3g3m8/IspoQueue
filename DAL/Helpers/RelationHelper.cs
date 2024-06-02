using IspoQueue.DAL.Models;
using IspoQueue.DAL.Models.MediateModel;
using Microsoft.EntityFrameworkCore;

namespace IspoQueue.DAL.Helpers;

public static class RelationHelper
{
    public static void CreateRelations(ModelBuilder modelBuilder)
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

    }
}