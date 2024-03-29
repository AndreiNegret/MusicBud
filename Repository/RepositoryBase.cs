﻿using Microsoft.EntityFrameworkCore;
using MusicBud.Data;
using MusicBud.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace MusicBud.Repository
{
    public class RepositoryBase<T> : IRepositoryBase<T> where T : class
    {
        protected ApplicationDbContext ApplicationDbContext { get; set; }

        public RepositoryBase(ApplicationDbContext repositoryContext)
        {
            ApplicationDbContext = repositoryContext;
        }

        public IQueryable<T> FindAll()
        {
            return ApplicationDbContext.Set<T>().AsNoTracking();
        }

        public IQueryable<T> FindByCondition(Expression<Func<T, bool>> expression)
        {
            return ApplicationDbContext.Set<T>().Where(expression).AsNoTracking();
        }

        public void Create(T entity)
        {
            ApplicationDbContext.Set<T>().Add(entity);
        }

        public void Update(T entity)
        {
            ApplicationDbContext.Set<T>().Update(entity);
        }

        public void Delete(T entity)
        {
            ApplicationDbContext.Set<T>().Remove(entity);
        }

        public async Task SaveAsync()
        {
            await ApplicationDbContext.SaveChangesAsync();
        }
    }
}
