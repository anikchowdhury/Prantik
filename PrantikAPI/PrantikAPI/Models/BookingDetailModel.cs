using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PrantikAPI.Models
{
    public class BookingDetailModel
    {
        public long Id { get; set; }
        public string BookingCode { get; set; }
        public DateTime CreateDate { get; set; }
        public virtual IEnumerable<UserModel> Users { get; set; }
        //public virtual ICollection<OrderDetail> OrderDetails { get; set; }
        public IEnumerable<RoomBookingModel> Rooms { get; set; }
        public IEnumerable<PaymentModel> Payments { get; set; }
    }
}