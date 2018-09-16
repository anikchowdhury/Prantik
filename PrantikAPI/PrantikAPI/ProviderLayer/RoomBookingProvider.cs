using PrantikAPI.DataLayer;
using PrantikAPI.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace PrantikAPI.ProviderLayer
{
    public class RoomBookingProvider
    {
        internal async Task<IEnumerable<RoomBookingModel>> GetRoomBookings()
        {
            using (PrantikEntities db = new PrantikEntities())
            {
                return await db.RoomBookings.Select(roomBooking => new RoomBookingModel()
                {
                    Amount = roomBooking.Amount,
                    BookingDetailsId = roomBooking.BookingDetailsId,
                    BookingEndDate = roomBooking.BookingEndDate,
                    BookingStartDate = roomBooking.BookingStartDate,
                    Id = roomBooking.Id,
                    RoomRoomNumber = roomBooking.RoomRoomNumber
                }).ToListAsync();
            }
        }
        internal async Task<RoomBookingModel> GetRoomBookingFromId(long id)
        {
            using (PrantikEntities db = new PrantikEntities())
            {
                RoomBooking roomBooking = await db.RoomBookings.FindAsync(id);

                return new RoomBookingModel()
                {
                    Amount = roomBooking.Amount,
                    BookingDetailsId = roomBooking.BookingDetailsId,
                    BookingEndDate = roomBooking.BookingEndDate,
                    BookingStartDate = roomBooking.BookingStartDate,
                    Id = roomBooking.Id,
                    RoomRoomNumber = roomBooking.RoomRoomNumber
                };
            }
        }
    }
}