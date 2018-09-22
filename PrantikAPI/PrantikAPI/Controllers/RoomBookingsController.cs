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
    public class RoomBookingsController : ApiController
    {
       // private PrantikEntities db = new PrantikEntities();
        private RoomBookingProvider _providerLayer = new RoomBookingProvider();

        // GET: api/RoomBookings
      /*  public async Task<IEnumerable<RoomBookingModel>> GetRoomBookings()
        {
            return await _providerLayer.GetRoomBookings();
        }

        // GET: api/RoomBookings/5
        [ResponseType(typeof(RoomBookingModel))]
        public async Task<IHttpActionResult> GetRoomBooking(long id)
        {
            RoomBookingModel roomBooking = await _providerLayer.GetRoomBookingFromId(id);

            if (roomBooking == null)
            {
                return NotFound();
            }
            return Ok(roomBooking);
        }
        */
        // PUT: api/RoomBookings/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutRoomBooking(long id, RoomBookingModel roomBookingModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != roomBookingModel.Id)
            {
                return BadRequest();
            }

            try
            {
                RoomBookingModel roomBooking = await _providerLayer.PutRoomBookingFromId(id, roomBookingModel);

                if (roomBooking.Id == 0)
                    return BadRequest();
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/RoomBookings
        [ResponseType(typeof(RoomBookingModel))]
        public async Task<IHttpActionResult> PostRoomBooking(RoomBookingModel roomBookingModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            roomBookingModel.CreateDate = DateTime.Now;
            roomBookingModel = await _providerLayer.PostRoomBookingFrom(roomBookingModel);

            return CreatedAtRoute("DefaultApi", new { id = roomBookingModel.Id }, roomBookingModel);
        }

        // DELETE: api/RoomBookings/5
       /* [ResponseType(typeof(RoomBooking))]
        public async Task<IHttpActionResult> DeleteRoomBooking(long id)
        {
            RoomBooking roomBooking = await db.RoomBookings.FindAsync(id);
            if (roomBooking == null)
            {
                return NotFound();
            }

            db.RoomBookings.Remove(roomBooking);
            await db.SaveChangesAsync();

            return Ok(roomBooking);
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