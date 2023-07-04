using GLASSTOP.BAL;
using GLASSTOP.Entity;
using GLASSTOP.Services.Helpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace GLASSTOP.Services.Controllers
{
    [Route("glasstop-api/[controller]")]
    [ApiController]
    public class TokenController : ControllerBase
    {
        private readonly AppSettings _appSettings;
        private int expiryTime = 0;
        private string secretKey = string.Empty;

        public TokenController(IOptions<AppSettings> appSettings)
        {
            _appSettings = appSettings.Value;
            expiryTime = _appSettings.JwtTokenExpire != 0 ? _appSettings.JwtTokenExpire : 60;
            secretKey = _appSettings.SecretKey != null ? _appSettings.SecretKey : "abcdefghijklmnopqrstuvwxyzDEFRTYSTRAEWD";
        }

        [HttpPost]
        [Route("GenerateJwtToken")]
        public IActionResult GenerateToken(JwtRequest objReq)
        {
            JwtResponse objResp = new JwtResponse();
            try
            {               
                if (!string.IsNullOrEmpty(objReq.Email))
                {
                    objResp.StatusCode = 200;
                    objResp.StatusMessage = "Success";
                    objResp.Token = generateJwtToken(objReq.Email);                    
                }
                else
                {
                    objResp.StatusCode = 25;
                    objResp.StatusMessage = "Input field is required";
                }
            }
            catch (Exception ex)
            {
                objResp.StatusCode = 404;
                objResp.StatusMessage = ex.Message.ToString();
            }
            return Ok(objResp);
        }

        private string generateJwtToken(string email)
        {
            // generate token that is valid for 2 hours
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(secretKey);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("email", email) }),
                Expires = DateTime.UtcNow.AddMinutes(expiryTime),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
