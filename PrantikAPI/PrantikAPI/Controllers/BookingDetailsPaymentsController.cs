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
    public class BookingDetailsPaymentsController : ApiController
    {
        private PrantikEntities db = new PrantikEntities();

      /*  // GET: api/BookingDetailsPayments
        public IQueryable<BookingDetailsPayment> GetBookingDetailsPayments()
        {
            return db.BookingDetailsPayments;
        }

        // GET: api/BookingDetailsPayments/5
        [ResponseType(typeof(BookingDetailsPayment))]
        public async Task<IHttpActionResult> GetBookingDetailsPayment(long id)
        {
            BookingDetailsPayment bookingDetailsPayment = await db.BookingDetailsPayments.FindAsync(id);
            if (bookingDetailsPayment == null)
            {
                return NotFound();
            }

            return Ok(bookingDetailsPayment);
        }

        // PUT: api/BookingDetailsPayments/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutBookingDetailsPayment(long id, BookingDetailsPayment bookingDetailsPayment)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != bookingDetailsPayment.Id)
            {
                return BadRequest();
            }

            db.Entry(bookingDetailsPayment).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookingDetailsPaymentExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }*/

        // POST: api/BookingDetailsPayments
        [ResponseType(typeof(BookingDetailsPayment))]
        public async Task<IHttpActionResult> PostBookingDetailsPayment(BookingDetailsPayment bookingDetailsPayment)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            bookingDetailsPayment.CreateDate = DateTime.Today;
            db.BookingDetailsPayments.Add(bookingDetailsPayment);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = bookingDetailsPayment.Id }, bookingDetailsPayment);
        }

     /*   // DELETE: api/BookingDetailsPayments/5
        [ResponseType(typeof(BookingDetailsPayment))]
        public async Task<IHttpActionResult> DeleteBookingDetailsPayment(long id)
        {
            BookingDetailsPayment bookingDetailsPayment = await db.BookingDetailsPayments.FindAsync(id);
            if (bookingDetailsPayment == null)
            {
                return NotFound();
            }

            db.BookingDetailsPayments.Remove(bookingDetailsPayment);
            await db.SaveChangesAsync();

            return Ok(bookingDetailsPayment);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool BookingDetailsPaymentExists(long id)
        {
            return db.BookingDetailsPayments.Count(e => e.Id == id) > 0;
        }*/
    }
}