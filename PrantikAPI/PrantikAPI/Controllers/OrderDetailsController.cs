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
    public class OrderDetailsController : ApiController
    {
        private FoodOrderProvider _providerLayer = new FoodOrderProvider();
        //private PrantikEntities db = new PrantikEntities();

        /*// GET: api/OrderDetails
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
        }*/

        // PUT: api/OrderDetails/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutOrderDetail(long id, FoodOrderModel foodOrderModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != foodOrderModel.Id)
            {
                return BadRequest();
            }

            try
            {
                foodOrderModel = await _providerLayer.PutOrderDetail(id, foodOrderModel);

                if (foodOrderModel.Id == 0)
                    return BadRequest();
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/OrderDetails
        [ResponseType(typeof(FoodOrderModel))]
        public async Task<IHttpActionResult> PostOrderDetail(FoodOrderModel foodOrderModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            foodOrderModel.CreateDate = DateTime.Today;
            await _providerLayer.PostOrderDetail(foodOrderModel);
            return CreatedAtRoute("DefaultApi", new { id = foodOrderModel.Id }, foodOrderModel);
        }

      /*  // DELETE: api/OrderDetails/5
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
        */
    }
}