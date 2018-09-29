using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PrantikAPI.Models
{
    public class BasePaymentModel
    {
        public long Id { get; set; }
        public decimal Amount { get; set; }
        public short PaymentModeId { get; set; }
        public string AdditionalDetails { get; set; }
        public DateTime CreateDate { get; set; }
    }
}