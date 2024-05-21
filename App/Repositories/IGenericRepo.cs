using IspoQueue.DAL.Models;

namespace IspoQueue.App.Repositories;

public interface IGenericRepo<TEntity> where TEntity : class
{
    Task Create(TEntity item);
    Task<TEntity?> FindById(Guid id);
    Task<List<TEntity?>?> FindByIds(Guid?[] id);
    Task<TEntity?> FindById(int id);
    Task<List<TEntity?>?> FindByIds(int?[] id);
    Task<List<TEntity>?> Get();
    Task Remove(TEntity item);
    Task<TEntity> Update(TEntity item);
    Task Delete(TEntity item);
}
