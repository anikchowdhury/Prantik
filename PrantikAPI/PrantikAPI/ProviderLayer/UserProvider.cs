using PrantikAPI.DataLayer;
using PrantikAPI.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
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
                    RelativeName = user.RelativeName
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
                    RelativeName = user.RelativeName
                };
            }
        }
    }
}