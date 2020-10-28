﻿using Base_Project817.DataAccess;
using Base_Project817.DataAccess.Entity;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Base_Project817.Api___Angular.Helper
{
    public class SeederDatabase
    {
        public static void SeedData(IServiceProvider services,
          IWebHostEnvironment env,
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
            //_context.Products.Add(new Product
            //{
            //    Title = "Nuts",
            //    Price = 50,
            //    Description = "...",
            //    Image = "https://images-na.ssl-images-amazon.com/images/I/71oR9w5AjbL._SX569_.jpg"
            //});

            //_context.Products.Add(new Product
            //{
            //    Title = "Milk",
            //    Price = 20,
            //    Description = "...",
            //    Image = "https://greenfood.in.ua/image/cache/catalog/tovar/napij-vivsjanij-ultrapasterizovanij-vega-milk-640x640.jpg"
            //});

            //_context.Products.Add(new Product
            //{
            //    Title = "Apple",
            //    Price = 10,
            //    Description = "...",
            //    Image = "https://sites.google.com/site/knowyourfruit/_/rsrc/1284636557816/know-your-apples/Apple%2002.jpg?height=362&width=400"
            //});

            //_context.SaveChanges();


            var roleName = "Admin";
            if (roleManager.FindByNameAsync(roleName).Result == null)
            {
                var resultAdminRole = roleManager.CreateAsync(new IdentityRole
                {
                    Name = "Admin"
                }).Result;

                var resultUserRole = roleManager.CreateAsync(new IdentityRole
                {
                    Name = "User"
                }).Result;



                string email = "admin@gmail.com";
                var admin = new User
                {
                    Email = email,
                    UserName = email
                };
                var andrii = new User
                {
                    Email = "cuanid236316@gmail.com",
                    UserName = "cuanid236316@gmail.com"
                };


                var resultAdmin = userManager.CreateAsync(admin, "Qwerty1-").Result;
                resultAdmin = userManager.AddToRoleAsync(admin, "Admin").Result;

                var resultAndrii = userManager.CreateAsync(andrii, "Qwerty1-").Result;
                resultAndrii = userManager.AddToRoleAsync(andrii, "User").Result;
            }
        }
    }
}
