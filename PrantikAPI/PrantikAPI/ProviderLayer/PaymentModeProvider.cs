using PrantikAPI.DataLayer;
using PrantikAPI.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Threading.Tasks;

namespace PrantikAPI.ProviderLayer
{
    public class PaymentModeProvider
    {
        internal async Task<IEnumerable<PaymentModel>> GetPayments()
        {
            using (PrantikEntities db = new PrantikEntities())
            {
                return await db.Payments.Select(payment => new PaymentModel()
                {
                    AdditionalDetails = payment.AdditionalDetails,
                    Amount = payment.Amount,
                    BookingDetailsId = payment.BookingDetailsId,
                    Id = payment.Id,
                    PaymentModeId = payment.PaymentModeId,
                    CreateDate = payment.CreateDate
                }).ToListAsync();
            }
        }
        internal async Task<PaymentModel> GetPaymentFromId(long id)
        {
            using (PrantikEntities db = new PrantikEntities())
            {
                Payment payment = await db.Payments.FindAsync(id);

                return new PaymentModel()
                {
                    AdditionalDetails = payment.AdditionalDetails,
                    Amount = payment.Amount,
                    BookingDetailsId = payment.BookingDetailsId,
                    Id = payment.Id,
                    PaymentModeId = payment.PaymentModeId,
                    CreateDate = payment.CreateDate
                };
            }
        }

        internal async Task<PaymentModel> PostPaymentFrom(PaymentModel paymentModel)
        {
            using (PrantikEntities db = new PrantikEntities())
            {
                Payment payment = db.Payments.Add(new Payment()
                {
                    AdditionalDetails = paymentModel.AdditionalDetails,
                    Amount = paymentModel.Amount,
                    BookingDetailsId = paymentModel.BookingDetailsId == 0 ? null : paymentModel.BookingDetailsId,
                    PaymentModeId = paymentModel.PaymentModeId,
                    CreateDate = paymentModel.CreateDate
                });
                await db.SaveChangesAsync();
                paymentModel.Id = payment.Id;
            }
            return paymentModel;
        }

        internal async Task<PaymentModel> PutPayment(long id, PaymentModel paymentModel)
        {
            using (PrantikEntities db = new PrantikEntities())
            {
                Payment payment = await db.Payments.FindAsync(id);
                payment.BookingDetailsId = paymentModel.BookingDetailsId;
                payment.AdditionalDetails = paymentModel.AdditionalDetails;
                payment.Amount = paymentModel.Amount;
                payment.PaymentModeId = paymentModel.PaymentModeId;
                payment.CreateDate = paymentModel.CreateDate;
                db.Entry(payment).State = EntityState.Modified;

                try
                {
                    await db.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (id != paymentModel.Id)
                        paymentModel.Id = 0;
                    else
                        throw;
                }
                return paymentModel;
            }
        }
    }
}