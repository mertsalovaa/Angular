using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Hosting;
using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Identity;
using BeautySalon.DATA_ACCESS.Entities;
using BeautySalon.DATA_ACCESS;
using System.Linq;

namespace BeautySalon.DOMAIN.Seeder
{
    public class SeederDatabase
    {
        public static void SeedData(IServiceProvider services,
          IConfiguration config)
        {
            using (var scope = services.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                var manager = scope.ServiceProvider.GetRequiredService<UserManager<User>>();
                var managerRole = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();
                var context = scope.ServiceProvider.GetRequiredService<EFContext>();
                SeedUsers(manager, managerRole, context);
            }
        }
        private static void SeedUsers(UserManager<User> userManager, RoleManager<IdentityRole> roleManager, EFContext _context)
        {
           // var productTypes = new List<GoodsType>()
           //{
           //    new GoodsType() {
           //        Name = "Makeup"
           //    },
           //     new GoodsType() {
           //        Name = "Hair"
           //    },
           //      new GoodsType() {
           //        Name = "Face"
           //    },
           //      new GoodsType() {
           //        Name = "Personal care"
           //    },
           //       new GoodsType() {
           //        Name = "Eco goods"
           //    }
           //};
           // var goods = new List<Goods>()
           // {
           //     new Goods()
           //     {
           //         Image = "https://prostor.ua/images/4/tush-dlya-resnits-maybelline-new-york-lash-sensational-ottenok-chernyy-9.5-ml-16976766483529_small4.jpg",
           //         Name = "Туш для вій Maybelline New York Lash Sensational відтінок Чорний, 9.5 мл",
           //         Description = "Lash Sensational, туш для вій, інтенсивний чорний. Завдяки революційної щіточці в формі віяла, туш фарбує всі вії, навіть найтонші і непомітні, піднімаючи і розкриваючи їх.",
           //         Price = 259,
           //         ProductId = _context.GoodsTypes.FirstOrDefault(x=>x.Name == "Makeup").Id,
           //         ProductType = _context.GoodsTypes.FirstOrDefault(x=>x.Name == "Makeup")
           //     },
           //     new Goods()
           //     {
           //         Image = "https://prostor.ua/images/4/tush-dlya-resnits-maybelline-new-york-lash-sensational-ottenok-chernyy-9.5-ml-16976766483529_small4.jpg",
           //         Name = "Туш для вій Maybelline New York Lash Sensational відтінок Чорний, 9.5 мл",
           //         Description = "Lash Sensational, туш для вій, інтенсивний чорний. Завдяки революційної щіточці в формі віяла, туш фарбує всі вії, навіть найтонші і непомітні, піднімаючи і розкриваючи їх.",
           //         Price = 259,
           //         ProductId = _context.GoodsTypes.FirstOrDefault(x=>x.Name == "Makeup").Id,
           //         ProductType = _context.GoodsTypes.FirstOrDefault(x=>x.Name == "Makeup")
           //     },
           //     new Goods()
           //     {
           //         Image = "https://prostor.ua/images/4/tush-dlya-resnits-maybelline-new-york-lash-sensational-ottenok-chernyy-9.5-ml-16976766483529_small4.jpg",
           //         Name = "Туш для вій Maybelline New York Lash Sensational відтінок Чорний, 9.5 мл",
           //         Description = "Lash Sensational, туш для вій, інтенсивний чорний. Завдяки революційної щіточці в формі віяла, туш фарбує всі вії, навіть найтонші і непомітні, піднімаючи і розкриваючи їх.",
           //         Price = 259,
           //         ProductId = _context.GoodsTypes.FirstOrDefault(x=>x.Name == "Makeup").Id,
           //         ProductType = _context.GoodsTypes.FirstOrDefault(x=>x.Name == "Makeup")
           //     },
           // };
           // _context.SaveChanges();

            var roleName = "Owner";
            if (roleManager.FindByNameAsync(roleName).Result == null)
            {
                #region seedRoles
                var resOwnerRole = roleManager.CreateAsync(new IdentityRole
                {
                    Name = "Owner"
                }).Result;

                var resEmployeeRole = roleManager.CreateAsync(new IdentityRole
                {
                    Name = "Employee"
                }).Result;
                var resMainManagerRole = roleManager.CreateAsync(new IdentityRole
                {
                    Name = "Main manager"
                }).Result;
                var resCustomerRole = roleManager.CreateAsync(new IdentityRole
                {
                    Name = "Customer"
                }).Result;


                string owner_ = "owner@gmail.com";
                var owner = new User
                {
                    Email = owner_,
                    UserName = owner_,
                    PhoneNumber = "+380(056)7726084",
                    FullName = "Julia Harrison",
                    BirthDate = new DateTime(1997, 10, 13),
                    Image = "https://thenewcode.com/assets/images/thumbnails/sarah-parmenter.jpeg",
                    Address = "Ukraine"
                };
                string employee_ = "employee@gmail.com";
                var employee = new User
                {
                    Email = employee_,
                    UserName = employee_,
                    PhoneNumber = "+380(0692)248650",
                    FullName = "Augusta Wells",
                    BirthDate = new DateTime(1998, 03, 25),
                    Image = "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQGvi17bSkPRyztqDUQC8x9BBCYXQ7ifO1k6A&usqp=CAU",
                    Address = "Ukraine"
                };
                string mainManager_ = "mainManager@gmail.com";
                var mainManager = new User
                {
                    Email = mainManager_,
                    UserName = mainManager_,
                    PhoneNumber = "+380(048)557289",
                    FullName = "Sara Bennett",
                    BirthDate = new DateTime(1997, 04, 20),
                    Image = "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRxOg3DGWhjrsHrnRrT047jhZGZPs_71CmSeA&usqp=CAU",
                    Address = "Ukraine"
                };

                string customer_ = "customer@gmail.com";
                var customer = new User
                {
                    Email = customer_,
                    UserName = customer_,
                    PhoneNumber = "+380(067)469280",
                    FullName = "Amilia Faller",
                    BirthDate = new DateTime(2000, 10, 04),
                    Image = "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ1JYrhg-1LkkTEknlQxE7WXIbd-XSuKlScaQ&usqp=CAU",
                    Address = "Ukraine"
                };

                var resultOwner = userManager.CreateAsync(owner, "Qwerty1-").Result;
                resultOwner = userManager.AddToRoleAsync(owner, "Owner").Result;

                var resultEmployee = userManager.CreateAsync(employee, "Qwerty1-").Result;
                resultEmployee = userManager.AddToRoleAsync(employee, "Employee").Result;

                var resultMainManager = userManager.CreateAsync(mainManager, "Qwerty1-").Result;
                resultMainManager = userManager.AddToRoleAsync(mainManager, "Main manager").Result;

                var resultCustomer = userManager.CreateAsync(customer, "Qwerty1-").Result;
                resultCustomer = userManager.AddToRoleAsync(customer, "Customer").Result;

                #endregion
            }
        }
    }
}
