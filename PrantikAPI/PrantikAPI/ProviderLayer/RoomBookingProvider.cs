using PrantikAPI.DataLayer;
using PrantikAPI.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
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
                    BookingEndDate = roomBooking.BookingEndDate.ToShortDateString(),
                    BookingStartDate = roomBooking.BookingStartDate.ToShortDateString(),
                    Id = roomBooking.Id,
                    RoomRoomNumber = roomBooking.RoomRoomNumber,
                    GST = roomBooking.GST,
                    CreateDate = roomBooking.CreateDate
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
                    BookingEndDate = roomBooking.BookingEndDate.ToShortDateString(),
                    BookingStartDate = roomBooking.BookingStartDate.ToShortDateString(),
                    Id = roomBooking.Id,
                    RoomRoomNumber = roomBooking.RoomRoomNumber,
                    GST = roomBooking.GST,
                    CreateDate = roomBooking.CreateDate
                };
            }
        }
        internal async Task<RoomBookingModel> PutRoomBookingFromId(long id, RoomBookingModel roomBookingModel)
        {
            using (PrantikEntities db = new PrantikEntities())
            {
                RoomBooking roomBooking = await db.RoomBookings.FindAsync(id);

                roomBooking.Amount = roomBookingModel.Amount;
                roomBooking.BookingDetailsId = roomBookingModel.BookingDetailsId;
                roomBooking.BookingEndDate = Convert.ToDateTime(roomBookingModel.BookingEndDate);
                roomBooking.BookingStartDate = Convert.ToDateTime(roomBookingModel.BookingStartDate);
                roomBooking.RoomRoomNumber = roomBookingModel.RoomRoomNumber;
                roomBooking.GST = roomBookingModel.GST;
                roomBooking.CreateDate = roomBookingModel.CreateDate;

                db.Entry(roomBooking).State = EntityState.Modified;

                try
                {
                    await db.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!(db.RoomBookings.Count(e => e.Id == id) > 0))
                    {
                        return new RoomBookingModel()
                        {
                            Id = 0
                        };
                    }
                    else
                    {
                        throw;
                    }
                }

                return new RoomBookingModel()
                {
                    Amount = roomBooking.Amount,
                    BookingDetailsId = roomBooking.BookingDetailsId,
                    BookingEndDate = roomBooking.BookingEndDate.ToShortDateString(),
                    BookingStartDate = roomBooking.BookingStartDate.ToShortDateString(),
                    Id = roomBooking.Id,
                    RoomRoomNumber = roomBooking.RoomRoomNumber,
                    GST = roomBooking.GST
                };
            }
        }

        internal async Task<RoomBookingModel> PostRoomBookingFrom(RoomBookingModel roomBookingModel)
        {
            using (PrantikEntities db = new PrantikEntities())
            {
                RoomBooking roomBooking = db.RoomBookings.Add(new RoomBooking()
                {
                    RoomRoomNumber = roomBookingModel.RoomRoomNumber,
                    Amount = roomBookingModel.Amount,
                    BookingEndDate = Convert.ToDateTime(roomBookingModel.BookingEndDate),
                    BookingStartDate = Convert.ToDateTime(roomBookingModel.BookingStartDate),
                    GST = roomBookingModel.GST,
                    BookingDetailsId = roomBookingModel.BookingDetailsId > 0 ? roomBookingModel.BookingDetailsId : null,
                    CreateDate = roomBookingModel.CreateDate
                });
                try
                {
                    await db.SaveChangesAsync();
                    roomBookingModel.Id = roomBooking.Id;
                }
                catch
                {

                    throw;
                }                                
                return roomBookingModel;
            }
        }
    }
}