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

    public async Task Update(TEntity item)
    {
        _context.Entry(item).State = EntityState.Modified;
        await _context.SaveChangesAsync();
    }
}