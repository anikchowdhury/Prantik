using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using PrantikAPI.DataLayer;
using PrantikAPI.Models;
using PrantikAPI.ProviderLayer;

namespace PrantikAPI.Controllers
{
    public class UsersController : ApiController
    {
       // private PrantikEntities db = new PrantikEntities();
        private UserProvider _provider = new UserProvider();

        // GET: api/Users
      /*  public Task<IEnumerable<UserModel>> GetUsers()
        {
            return _provider.GetUsers();
        }

        // GET: api/Users/5
        [ResponseType(typeof(UserModel))]
        public async Task<IHttpActionResult> GetUser(long id)
        {
            UserModel user = await _provider.GetUserById(id);
            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }*/

        // PUT: api/Users/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutUser(long id, UserModel user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != user.Id)
            {
                return BadRequest();
            }

            user = await _provider.PutUser(user);
            

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Users
        [ResponseType(typeof(UserModel))]
        public async Task<IHttpActionResult> PostUser(UserModel userModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            userModel.CreateDate = DateTime.Today;
            userModel = await _provider.PostUser(userModel);
            return CreatedAtRoute("DefaultApi", new { id = userModel.Id }, userModel);
        }

        // DELETE: api/Users/5
       /* [ResponseType(typeof(User))]
        public async Task<IHttpActionResult> DeleteUser(long id)
        {
            User user = await db.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            db.Users.Remove(user);
            await db.SaveChangesAsync();

            return Ok(user);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }*/
    }
}