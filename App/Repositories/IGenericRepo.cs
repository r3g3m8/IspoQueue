namespace IspoQueue.App.Repositories;

public interface IGenericRepo<TEntity> where TEntity : class
{
    Task Create(TEntity item);
    Task<TEntity?> FindById(Guid id);
    Task<List<TEntity>?> Get();
    Task Remove(TEntity item);
    Task Update(TEntity item);
}
