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
    public class BookingDetailsController : ApiController
    {
        private PrantikEntities db = new PrantikEntities();

        // GET: api/BookingDetails
        public IQueryable<BookingDetail> GetBookingDetails()
        {
            return db.BookingDetails;
        }

        // GET: api/BookingDetails/5
        [ResponseType(typeof(BookingDetail))]
        public async Task<IHttpActionResult> GetBookingDetail(long id)
        {
            BookingDetail bookingDetail = await db.BookingDetails.FindAsync(id);
            if (bookingDetail == null)
            {
                return NotFound();
            }

            return Ok(bookingDetail);
        }

        // PUT: api/BookingDetails/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutBookingDetail(long id, BookingDetail bookingDetail)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != bookingDetail.Id)
            {
                return BadRequest();
            }

            db.Entry(bookingDetail).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookingDetailExists(id))
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

        // POST: api/BookingDetails
        [ResponseType(typeof(BookingDetail))]
        public async Task<IHttpActionResult> PostBookingDetail(BookingDetail bookingDetail)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.BookingDetails.Add(bookingDetail);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = bookingDetail.Id }, bookingDetail);
        }

        // DELETE: api/BookingDetails/5
        [ResponseType(typeof(BookingDetail))]
        public async Task<IHttpActionResult> DeleteBookingDetail(long id)
        {
            BookingDetail bookingDetail = await db.BookingDetails.FindAsync(id);
            if (bookingDetail == null)
            {
                return NotFound();
            }

            db.BookingDetails.Remove(bookingDetail);
            await db.SaveChangesAsync();

            return Ok(bookingDetail);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool BookingDetailExists(long id)
        {
            return db.BookingDetails.Count(e => e.Id == id) > 0;
        }
    }
}