using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PrantikAPI.Models
{
    public class BookingDetailsPaymentModel
    {
        public long Id { get; set; }
        public long PaymentId { get; set; }
        public long BookingDetailsId { get; set; }
    }
}