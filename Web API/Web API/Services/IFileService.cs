using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web_API.Data;
using Web_API.Models;

namespace Web_API.Services
{
    public interface IFileService
    {
        Task<bool> UploadFile(FileModel request);

        List<Files> GetFiles();

        Files GetFile(int id);

        String GetFilePath(int id);
    }
}
