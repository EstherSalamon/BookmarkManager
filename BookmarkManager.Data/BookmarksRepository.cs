using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookmarkManager.Data
{
    public class BookmarksRepository
    {
        private readonly string _connection;

        public BookmarksRepository(string connection)
        {
            _connection = connection;
        }

        public void AddBookmark(Bookmark b)
        {
            using BookmarksDataContext context = new BookmarksDataContext(_connection);
            context.Bookmarks.Add(b);
            context.SaveChanges();
        }

        public void UpdateBookmark(Bookmark b)
        {
            using BookmarksDataContext context = new BookmarksDataContext(_connection);
            context.Update(b);
            context.SaveChanges();
        }

        public void DeleteBookmark(int id)
        {
            using BookmarksDataContext context = new BookmarksDataContext(_connection);
            context.Database.ExecuteSqlInterpolated($"DELETE FROM Bookmarks WHERE Id = {id}");
        }

        public List<Bookmark> GetAllBookmarks(int id)
        {
            using BookmarksDataContext context = new BookmarksDataContext(_connection);
            return context.Bookmarks.Where(b => b.UserId == id).ToList();
        }

        public List<TopBookmark> GetTop5()
        {
            using BookmarksDataContext context = new BookmarksDataContext(_connection);
            return context.Bookmarks.GroupBy(b => b.URL).OrderByDescending(b => b.Count()).Take(5).Select(i => new TopBookmark { URL = i.Key, Count = i.Count()}).ToList();
        }
    }
}
