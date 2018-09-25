using PrantikAPI.DataLayer;
using PrantikAPI.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace PrantikAPI.ProviderLayer
{
    public class FoodOrderProvider
    {
        internal async Task<FoodOrderModel> PostOrderDetail(FoodOrderModel foodOrderModel)
        {
            using (PrantikEntities db = new PrantikEntities())
            {
                OrderDetail orderDetail = new OrderDetail()
                {
                    BookingDetailsId = foodOrderModel.BookingDetailsId == 0 ? null : foodOrderModel.BookingDetailsId,
                    CreateDate = foodOrderModel.CreateDate,
                    MenuId = foodOrderModel.MenuId,
                    OrderExpectedDeliveryDate = foodOrderModel.OrderExpectedDeliveryDate,
                    OrderExpectedDeliveryTime = foodOrderModel.OrderExpectedDeliveryTime,
                    Price = foodOrderModel.Price,
                    Quantity = foodOrderModel.Quantity,
                    AdditionalDetails = foodOrderModel.AdditionalDetails
                };

                db.OrderDetails.Add(orderDetail);
                await db.SaveChangesAsync();
                foodOrderModel.Id = orderDetail.Id;
                return foodOrderModel;
            }
        }

        internal async Task<FoodOrderModel> PutOrderDetail(long id, FoodOrderModel foodOrderModel)
        {
            using (PrantikEntities db = new PrantikEntities())
            {
                OrderDetail orderDetail = await db.OrderDetails.FindAsync(id);
                orderDetail.BookingDetailsId = foodOrderModel.BookingDetailsId == 0 ? null : foodOrderModel.BookingDetailsId;
                orderDetail.MenuId = foodOrderModel.MenuId;
                orderDetail.OrderExpectedDeliveryDate = foodOrderModel.OrderExpectedDeliveryDate;
                orderDetail.OrderExpectedDeliveryTime = foodOrderModel.OrderExpectedDeliveryTime;
                orderDetail.Price = foodOrderModel.Price;
                orderDetail.Quantity = foodOrderModel.Quantity;
                orderDetail.AdditionalDetails = foodOrderModel.AdditionalDetails;

                db.Entry(orderDetail).State = System.Data.Entity.EntityState.Modified;
                try
                {
                    await db.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!(db.OrderDetails.Count(e => e.Id == id) > 0))
                    {
                        return new FoodOrderModel()
                        {
                            Id = 0
                        };
                    }
                    else
                    {
                        throw;
                    }
                }
                return foodOrderModel;
            }
        }
    }
}