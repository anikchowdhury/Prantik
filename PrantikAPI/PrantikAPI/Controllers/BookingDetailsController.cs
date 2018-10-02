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
    public class BookingDetailsController : ApiController
    {
        // private PrantikEntities db = new PrantikEntities();
        private BookingDetailProvider _provider = new BookingDetailProvider();

        // GET: api/BookingDetails
        public IEnumerable<BookingDetailModel> GetBookingDetails()
        {
            return _provider.GetBookingDetails();
        }

        // GET: api/BookingDetails/5
        [ResponseType(typeof(BookingDetailModel))]
        public async Task<IHttpActionResult> GetBookingDetail(string bookingCode)
        {
            var bookingDetail = await _provider.GetBookingDetailFromBookingCode(bookingCode);

            if (bookingDetail == null)
            {
                return NotFound();
            }

            return Ok(bookingDetail);
        }

        /*  // PUT: api/BookingDetails/5
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
          }*/

        // POST: api/BookingDetails
        [ResponseType(typeof(BookingDetailModel))]
        public async Task<IHttpActionResult> PostBookingDetail()
        {
            var bookingDetailModel = new BookingDetailModel()
            {
                BookingCode = $"PR/{DateTime.Now.ToString("yyyyMMdd")}/{DateTime.Now.ToString("HHmm")}",
                CreateDate = DateTime.Today
            };
            bookingDetailModel = await _provider.PostBookingDetail(bookingDetailModel);

            return CreatedAtRoute("DefaultApi", new { id = bookingDetailModel.Id }, bookingDetailModel);
        }

        // DELETE: api/BookingDetails/5
        /*  [ResponseType(typeof(BookingDetail))]
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
          }*/
    }
}