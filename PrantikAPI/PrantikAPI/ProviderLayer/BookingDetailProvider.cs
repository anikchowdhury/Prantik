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
                BookingDetail bookingDetail = null;
                if (long.TryParse(bookingCode, out long outVal))
                    bookingDetail = await db.BookingDetails.Include(x => x.BookingDetailsUsers.Select(y => y.User)).Include(x => x.RoomBookings).FirstOrDefaultAsync(item => item.Id == outVal);
                else
                    bookingDetail = await db.BookingDetails.Include(x => x.BookingDetailsUsers.Select(y => y.User)).Include(x => x.RoomBookings).FirstOrDefaultAsync(item => item.BookingCode.ToUpper() == bookingCode.ToUpper());

                return new BookingDetailModel()
                {
                    Id = bookingDetail.Id,
                    BookingCode = bookingDetail.BookingCode,
                    Users = bookingDetail.BookingDetailsUsers.Select(x => new UserModel()
                    {
                        Address = x.User.Address,
                        Age = x.User.Age.Trim(),
                        ComingFrom = x.User.ComingFrom,
                        GoingTo = x.User.GoingTo,
                        Id = x.User.Id,
                        IdCardNumber = x.User.IdCardNumber,
                        Name = x.User.Name,
                        PhoneNumber = x.User.PhoneNumber,
                        Profession = x.User.Profession,
                        RelativeName = x.User.RelativeName,
                        CreateDate = x.User.CreateDate
                    }),
                    Rooms = bookingDetail.RoomBookings.Select(x => new RoomBookingModel()
                    {
                        Amount = x.Amount,
                        BookingDetailsId = x.BookingDetailsId,
                        BookingEndDate = x.BookingEndDate.ToShortDateString(),
                        BookingStartDate = x.BookingStartDate.ToShortDateString(),
                        Id = x.Id,
                        RoomRoomNumber = x.RoomRoomNumber,
                        GST = x.GST,
                        CreateDate = x.CreateDate
                    }),
                    Payments = bookingDetail.Payments.Select(x => new PaymentModel()
                    {
                        Id = x.Id,
                        AdditionalDetails = x.AdditionalDetails,
                        Amount = x.Amount,
                        BookingDetailsId = x.BookingDetailsId,
                        PaymentModeId = x.PaymentModeId,
                        CreateDate = x.CreateDate
                    })
                };
            }
        }

        internal async Task<BookingDetailModel> PostBookingDetail(BookingDetailModel bookingDetailModel)
        {
            using (PrantikEntities db = new PrantikEntities())
            {
                BookingDetail bookingDetail = new BookingDetail()
                {
                    BookingCode = bookingDetailModel.BookingCode,
                    CreateDate = bookingDetailModel.CreateDate
                };
                
                db.BookingDetails.Add(bookingDetail);
                await db.SaveChangesAsync();
                bookingDetailModel.Id = bookingDetail.Id;                
            }
            return bookingDetailModel;
        }
    }
}