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

namespace PrantikAPI.Controllers
{
    public class BookingDetailsUsersController : ApiController
    {
        private PrantikEntities db = new PrantikEntities();

        // GET: api/BookingDetailsUsers
        public IQueryable<BookingDetailsUser> GetBookingDetailsUsers()
        {
            return db.BookingDetailsUsers;
        }

        // GET: api/BookingDetailsUsers/5
        [ResponseType(typeof(BookingDetailsUser))]
        public async Task<IHttpActionResult> GetBookingDetailsUser(long id)
        {
            BookingDetailsUser bookingDetailsUser = await db.BookingDetailsUsers.FindAsync(id);
            if (bookingDetailsUser == null)
            {
                return NotFound();
            }

            return Ok(bookingDetailsUser);
        }

        // PUT: api/BookingDetailsUsers/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutBookingDetailsUser(long id, BookingDetailsUser bookingDetailsUser)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != bookingDetailsUser.Id)
            {
                return BadRequest();
            }

            db.Entry(bookingDetailsUser).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookingDetailsUserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/BookingDetailsUsers
        [ResponseType(typeof(BookingDetailsUser))]
        public async Task<IHttpActionResult> PostBookingDetailsUser(BookingDetailsUser bookingDetailsUser)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.BookingDetailsUsers.Add(bookingDetailsUser);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = bookingDetailsUser.Id }, bookingDetailsUser);
        }

        // DELETE: api/BookingDetailsUsers/5
        [ResponseType(typeof(BookingDetailsUser))]
        public async Task<IHttpActionResult> DeleteBookingDetailsUser(long id)
        {
            BookingDetailsUser bookingDetailsUser = await db.BookingDetailsUsers.FindAsync(id);
            if (bookingDetailsUser == null)
            {
                return NotFound();
            }

            db.BookingDetailsUsers.Remove(bookingDetailsUser);
            await db.SaveChangesAsync();

            return Ok(bookingDetailsUser);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool BookingDetailsUserExists(long id)
        {
            return db.BookingDetailsUsers.Count(e => e.Id == id) > 0;
        }
    }
}