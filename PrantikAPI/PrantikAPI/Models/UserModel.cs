using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PrantikAPI.Models
{
    public class UserModel
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string ComingFrom { get; set; }
        public string GoingTo { get; set; }
        public string PhoneNumber { get; set; }
        public string Age { get; set; }
        public string IdCardNumber { get; set; }
        public string RelativeName { get; set; }
        public string Profession { get; set; }
    }
}