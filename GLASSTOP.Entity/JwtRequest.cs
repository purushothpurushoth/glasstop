using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GLASSTOP.Entity
{
    public class JwtRequest
    {
        public string? Email { get; set; }
    }

    public class JwtResponse : Response
    {
        public string? Token { get; set; }

    }
}
