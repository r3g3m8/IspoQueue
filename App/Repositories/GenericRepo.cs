using IspoQueue.DAL;
using IspoQueue.DAL.Models;
using Microsoft.EntityFrameworkCore;

namespace IspoQueue.App.Repositories;

public class GenericRepo<TEntity> : IGenericRepo<TEntity> where TEntity : class
{
    private readonly AppDbContext _context;
    private readonly DbSet<TEntity> _dbSet;

    public GenericRepo(AppDbContext context)
    {
        _context = context;
        _dbSet = context.Set<TEntity>();
    }

    public async Task Create(TEntity item)
    {
        await _dbSet.AddAsync(item);
        await _context.SaveChangesAsync();
    }

    public async Task<TEntity?> FindById(Guid id)
    {
        var layers = await Get();
        var e = await _dbSet.FindAsync(id);

        return e;
    }

    public async Task<List<TEntity?>?> FindByIds(Guid?[] ids)
    {
        List<TEntity?> e = new List<TEntity?>();
        foreach (var id in ids)
        {
            if(id.HasValue)
                e.Add(await FindById(id.Value));
        }

        return e;
    }

    public async Task<TEntity?> FindById(int id)
    {
        var layers = await Get();
        var e = await _dbSet.FindAsync(id);

        return e;
    }

    public async Task<List<TEntity?>?> FindByIds(int?[] ids)
    {
        List<TEntity?> e = new List<TEntity?>();
        foreach (var id in ids)
        {
            if (id.HasValue)
                e.Add(await FindById(id.Value));
        }

        return e;
    }

    public async Task<List<TEntity>?> Get()
    {
        var l = await _dbSet.AsNoTracking().ToListAsync();

        return l;
    }

    public async Task Remove(TEntity item)
    {
        _dbSet.Remove(item);
        await _context.SaveChangesAsync();
    }

    public async Task<TEntity> Update(TEntity item)
    {
        _context.Entry(item).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return item;
    }

    public async Task Delete(TEntity item)
    {
         _dbSet.Remove(item);
         await _context.SaveChangesAsync();
    }
}