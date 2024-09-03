using BookmarkManager.Data;
using BookmarkManager.Web.View_Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookmarkManager.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookmarksController : ControllerBase
    {
        private readonly string _connection;

        public BookmarksController(IConfiguration config)
        {
            _connection = config.GetConnectionString("ConStr");
        }

        [HttpGet("getall")]
        public List<Bookmark> GetAll()
        {
            UserRepository uRepo = new UserRepository(_connection);
            User user = uRepo.GetByEmail(User.Identity.Name);
            if(user == null)
            {
                return null;
            }
            BookmarksRepository repo = new BookmarksRepository(_connection);
            return repo.GetAllBookmarks(user.Id);
        }

        [HttpPost("add")]
        public void Add(BookmarkVM vm)
        {
            UserRepository uRepo = new UserRepository(_connection);
            User user = uRepo.GetByEmail(User.Identity.Name);
            if(user == null)
            {
                return;
            }
            vm.Bookmark.UserId = user.Id;
            BookmarksRepository repo = new BookmarksRepository(_connection);
            repo.AddBookmark(vm.Bookmark);
        }

        [HttpPost("update")]
        public void Update(BookmarkVM vm)
        {
            BookmarksRepository repo = new BookmarksRepository(_connection);
            repo.UpdateBookmark(vm.Bookmark);
        }

        [HttpPost("delete")]
        public void Delete(int id)
        {
            BookmarksRepository repo = new BookmarksRepository(_connection);
            repo.DeleteBookmark(id);
        }

        [HttpGet("top5")]
        public List<TopBookmark> GetTop5()
        {
            BookmarksRepository repo = new BookmarksRepository(_connection);
            return repo.GetTop5();
        }
    }
}
