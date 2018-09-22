using PrantikAPI.DataLayer;
using PrantikAPI.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace PrantikAPI.ProviderLayer
{
    public class UserProvider
    {
        internal async Task<IEnumerable<UserModel>> GetUsers()
        {
            using (PrantikEntities db = new PrantikEntities())
            {
                return await db.Users.Select(user => new UserModel()
                {
                    Address = user.Address,
                    Age = user.Age,
                    ComingFrom = user.ComingFrom,
                    GoingTo = user.GoingTo,
                    Id = user.Id,
                    IdCardNumber = user.IdCardNumber,
                    Name = user.Name,
                    PhoneNumber = user.PhoneNumber,
                    Profession = user.Profession,
                    RelativeName = user.RelativeName,
                    CreateDate = user.CreateDate
                }).ToListAsync();
            }
        }

        internal async Task<UserModel> GetUserById(long id)
        {
            using (PrantikEntities db = new PrantikEntities())
            {
                User user = await db.Users.FindAsync(id);
                return new UserModel()
                {
                    Address = user.Address,
                    Age = user.Age,
                    ComingFrom = user.ComingFrom,
                    GoingTo = user.GoingTo,
                    Id = user.Id,
                    IdCardNumber = user.IdCardNumber,
                    Name = user.Name,
                    PhoneNumber = user.PhoneNumber,
                    Profession = user.Profession,
                    RelativeName = user.RelativeName,
                    CreateDate = user.CreateDate
                };
            }
        }

        internal async Task<UserModel> PutUser(UserModel userModel)
        {
            using (PrantikEntities db = new PrantikEntities())
            {
                User user = new User()
                {
                    Address = userModel.Address,
                    Age = userModel.Age,
                    ComingFrom = userModel.ComingFrom,
                    GoingTo = userModel.GoingTo,
                    Id = userModel.Id,
                    IdCardNumber = userModel.IdCardNumber,
                    Name = userModel.Name,
                    PhoneNumber = userModel.PhoneNumber,
                    Profession = userModel.Profession,
                    RelativeName = userModel.RelativeName,
                    CreateDate = userModel.CreateDate
                };
                db.Entry(user).State = EntityState.Modified;

                try
                {
                    await db.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (db.Users.Count(e => e.Id == userModel.Id) == 0)
                    {
                        return new UserModel()
                        {
                            Id = 0
                        };
                    }
                    else
                    {
                        throw;
                    }
                }
                return userModel;
            }
        }

        internal async Task<UserModel> PostUser(UserModel userModel)
        {
            using (PrantikEntities db = new PrantikEntities())
            {
                User user = new User()
                {
                    Address = userModel.Address,
                    Age = userModel.Age,
                    ComingFrom = userModel.ComingFrom,
                    GoingTo = userModel.GoingTo,
                    Id = userModel.Id,
                    IdCardNumber = userModel.IdCardNumber,
                    Name = userModel.Name,
                    PhoneNumber = userModel.PhoneNumber,
                    Profession = userModel.Profession,
                    RelativeName = userModel.RelativeName,
                    CreateDate = userModel.CreateDate
                };
                db.Users.Add(user);
                await db.SaveChangesAsync();
                userModel.Id = user.Id;                
            }
            return userModel;
        }
    }
}