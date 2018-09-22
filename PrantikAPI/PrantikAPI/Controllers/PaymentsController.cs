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
    public class PaymentsController : ApiController
    {
        private PrantikEntities db = new PrantikEntities();
        private PaymentModeProvider _provider = new PaymentModeProvider();

        // GET: api/Payments
        public async Task<IEnumerable<PaymentModel>> GetPayments()
        {
            return await _provider.GetPayments();
        }

        // GET: api/Payments/5
        [ResponseType(typeof(PaymentModel))]
        public async Task<IHttpActionResult> GetPayment(long id)
        {
            PaymentModel payment = await _provider.GetPaymentFromId(id);
            if (payment == null)
            {
                return NotFound();
            }

            return Ok(payment);
        }

        // PUT: api/Payments/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutPayment(long id, PaymentModel paymentModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                PaymentModel payment = await _provider.PutPayment(id, paymentModel);
                if (payment.Id == 0)
                    return BadRequest();
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Payments
        [ResponseType(typeof(PaymentModel))]
        public async Task<IHttpActionResult> PostPayment(PaymentModel paymentModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            paymentModel.CreateDate = DateTime.Today;
            paymentModel = await _provider.PostPaymentFrom(paymentModel);
            return CreatedAtRoute("DefaultApi", new { id = paymentModel.Id }, paymentModel);
        }

        // DELETE: api/Payments/5
        [ResponseType(typeof(Payment))]
        public async Task<IHttpActionResult> DeletePayment(long id)
        {
            Payment payment = await db.Payments.FindAsync(id);
            if (payment == null)
            {
                return NotFound();
            }

            db.Payments.Remove(payment);
            await db.SaveChangesAsync();

            return Ok(payment);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PaymentExists(long id)
        {
            return db.Payments.Count(e => e.Id == id) > 0;
        }
    }
}