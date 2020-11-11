using BeautySalon.DATA_ACCESS.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace BeautySalon.DATA_ACCESS
{
    public class EFContext : IdentityDbContext<User>
    {
        public EFContext(DbContextOptions<EFContext> options) : base(options) { }

        #region DbSets
        public DbSet<Speciality> Specialities { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<EmplSpec> EmplSpecs { get; set; }

        public DbSet<Customer> Customers { get; set; }
        public DbSet<GoodsType> GoodsTypes { get; set; }
        public DbSet<Goods> Goods { get; set; }
        public DbSet<OrderGoods> OrderGoods { get; set; }
        public DbSet<HistoryGoods> HistoryGoods { get; set; }
        public DbSet<ServiceType> ServiceTypes { get; set; }
        public DbSet<HistoryService> HistoryServices { get; set; }
        public DbSet<Service> Services { get; set; }
        public DbSet<OrderService> OrderService { get; set; }
        #endregion

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }
    }
}
