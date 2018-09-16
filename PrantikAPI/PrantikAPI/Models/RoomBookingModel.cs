using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PrantikAPI.Models
{
    public class RoomBookingModel
    {
        public long Id { get; set; }
        public string RoomRoomNumber { get; set; }
        public Nullable<long> BookingDetailsId { get; set; }
        public DateTime BookingStartDate { get; set; }
        public DateTime BookingEndDate { get; set; }
        public decimal Amount { get; set; }
    }
}