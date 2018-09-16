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
    public class BookingDetailProvider
    {
        internal async Task<BookingDetailModel> GetBookingDetailFromBookingCode(string bookingCode)
        {
            using (PrantikEntities db = new PrantikEntities())
            {
                var bookingDetail = await db.BookingDetails.Include(x => x.BookingDetailsUsers.Select(y => y.User)).Include(x => x.RoomBookings).FirstOrDefaultAsync(item => item.BookingCode.ToUpper() == bookingCode.ToUpper());

                return new BookingDetailModel()
                {
                    BookingCode = bookingDetail.BookingCode,
                    Users = bookingDetail.BookingDetailsUsers.Select(x => new UserModel()
                    {
                        Address = x.User.Address,
                        Age = x.User.Age,
                        ComingFrom = x.User.ComingFrom,
                        GoingTo = x.User.GoingTo,
                        Id = x.User.Id,
                        IdCardNumber = x.User.IdCardNumber,
                        Name = x.User.Name,
                        PhoneNumber = x.User.PhoneNumber,
                        Profession = x.User.Profession,
                        RelativeName = x.User.RelativeName
                    }),
                    Rooms = bookingDetail.RoomBookings.Select(x => new RoomBookingModel()
                    {
                        Amount = x.Amount,
                        BookingDetailsId = x.BookingDetailsId,
                        BookingEndDate = x.BookingEndDate,
                        BookingStartDate = x.BookingStartDate,
                        Id = x.Id,
                        RoomRoomNumber = x.RoomRoomNumber
                    })
                };
            }
        }
    }
}