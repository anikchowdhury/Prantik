using PrantikAPI.DataLayer;
using PrantikAPI.Models;
using System.Collections.Generic;
using System.Data.Entity;
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
                    PaymentModeId = payment.PaymentModeId
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
                    PaymentModeId = payment.PaymentModeId
                };
            }
        }
    }
}