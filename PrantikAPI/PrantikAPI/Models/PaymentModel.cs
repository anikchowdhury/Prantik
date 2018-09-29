using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PrantikAPI.Models
{
    public class PaymentModel : BasePaymentModel
    {
        public string PaymentFor { get; set; }
    }
}