using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using PrantikAPI.DataLayer;

namespace PrantikAPI.Controllers
{
    public class MenusController : ApiController
    {
       /* private PrantikEntities db = new PrantikEntities();

        // GET: api/Menus
        public IQueryable<Menu> GetMenus()
        {
            return db.Menus;
        }

        // GET: api/Menus/5
        [ResponseType(typeof(Menu))]
        public async Task<IHttpActionResult> GetMenu(int id)
        {
            Menu menu = await db.Menus.FindAsync(id);
            if (menu == null)
            {
                return NotFound();
            }

            return Ok(menu);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }*/
    }
}