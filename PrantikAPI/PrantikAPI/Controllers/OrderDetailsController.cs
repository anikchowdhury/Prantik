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
    public class OrderDetailsController : ApiController
    {
       /* private PrantikEntities db = new PrantikEntities();

        // GET: api/OrderDetails
        public IQueryable<OrderDetail> GetOrderDetails()
        {
            return db.OrderDetails;
        }

        // GET: api/OrderDetails/5
        [ResponseType(typeof(OrderDetail))]
        public async Task<IHttpActionResult> GetOrderDetail(long id)
        {
            OrderDetail orderDetail = await db.OrderDetails.FindAsync(id);
            if (orderDetail == null)
            {
                return NotFound();
            }

            return Ok(orderDetail);
        }

        // PUT: api/OrderDetails/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutOrderDetail(long id, OrderDetail orderDetail)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != orderDetail.Id)
            {
                return BadRequest();
            }

            db.Entry(orderDetail).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderDetailExists(id))
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

        // POST: api/OrderDetails
        [ResponseType(typeof(OrderDetail))]
        public async Task<IHttpActionResult> PostOrderDetail(OrderDetail orderDetail)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.OrderDetails.Add(orderDetail);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = orderDetail.Id }, orderDetail);
        }

        // DELETE: api/OrderDetails/5
        [ResponseType(typeof(OrderDetail))]
        public async Task<IHttpActionResult> DeleteOrderDetail(long id)
        {
            OrderDetail orderDetail = await db.OrderDetails.FindAsync(id);
            if (orderDetail == null)
            {
                return NotFound();
            }

            db.OrderDetails.Remove(orderDetail);
            await db.SaveChangesAsync();

            return Ok(orderDetail);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool OrderDetailExists(long id)
        {
            return db.OrderDetails.Count(e => e.Id == id) > 0;
        }*/
    }
}