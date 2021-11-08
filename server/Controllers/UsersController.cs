using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using minizalo.Dtos;
using minizalo.Entities;
using minizalo.Repositories;

namespace minizalo.Controllers
{
    [ApiController] 
    [Route("users")]
    public class UsersController : ControllerBase
    {
        private readonly IUsersRepository _usersRepository;

        public UsersController(IUsersRepository usersRepository)
        {
            this._usersRepository = usersRepository;
        }
        
        // Get users
        [HttpGet]
        public IEnumerable<UserDto> GetUsers()
        {
            var users = _usersRepository.GetUsers().Select(user => user.AsUserDto());

            return users;
        }

        [HttpGet("{id}")]
        public ActionResult<UserDto> GetUserById(Guid id)
        {
            var user = _usersRepository.GetUserById(id);

            if (user is null)
            {
                return NotFound();
            }
            
            return user.AsUserDto();
        }
        
        // Create user
        [HttpPost]
        public ActionResult<UserDto> CreateUser(CreateUserDto createUserDto)
        {
            User user = new()
            {
                UserId = Guid.NewGuid(),
                UserName = createUserDto.UserName,
                Email = createUserDto.Email,
                Password = createUserDto.Password,
                Avatar = createUserDto.Avatar,
                CreatedAt = createUserDto.CreatedAt
            };
            
            _usersRepository.CreateUser(user);

            return CreatedAtAction(nameof(GetUserById), new {id = user.UserId}, user.AsUserDto());
        }
        
        // Update user
        [HttpPut("{id}")]
        public ActionResult<UserDto> UpdateUser(Guid id, UpdateUserDto updateUserDto)
        {
            var existingUser = _usersRepository.GetUserById(id);
            
            if (existingUser is null)
            {
                return NotFound();
            }

            User updatedUser = existingUser with
            {
                UserName = updateUserDto.UserName,
                Avatar = updateUserDto.Avatar,
                Password = updateUserDto.Password
            };
            
            _usersRepository.UpdateUser(updatedUser);

            return NoContent();
        }
    }
}