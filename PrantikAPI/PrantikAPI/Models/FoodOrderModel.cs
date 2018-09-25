using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PrantikAPI.Models
{
    public class FoodOrderModel
    {
        public long Id { get; set; }
        public long? BookingDetailsId { get; set; }
        public int MenuId { get; set; }
        public short Quantity { get; set; }
        public decimal Price { get; set; }
        public DateTime OrderExpectedDeliveryDate { get; set; }
        public DateTime CreateDate { get; set; }
        public TimeSpan OrderExpectedDeliveryTime { get; set; }
        public string MenuName { get; set; }
        public string AdditionalDetails { get; set; }
        public string OrderExpectedDeliveryDateFormated { get { return OrderExpectedDeliveryDate.ToShortDateString(); } }
    }
}